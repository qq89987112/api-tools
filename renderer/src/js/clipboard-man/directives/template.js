import keyboard from "../js/keyboard";
import templateMaker from "../../templateMaker";
import utils from "../js/utils";
import context from "../js/context";
const {clipboard, remote} = window.require('electron');
const path = remote.require("path");
const jsBeautify = remote.require("js-beautify");
const fse = remote.require("fs-extra");

export default {
    validate:/\$template`([\s\S]+?)`\?(?:file=(\S+))?/,
    handle(result){
        let
            clipboardContent = clipboard.readText(),
            templateOption = {
                template: result[1],
                notify: {}
            },
            file = result[2],
            noticeReg = /\$\$(.+?)`([\s\S]+?)`/g,
            paramsReg = /\$params\?.+/,
            testReg = /\$test\??.*/,    // ? 可有可无
            paramsResult = paramsReg.exec(clipboardContent),
            testResult = testReg.exec(clipboardContent),
            noticeResult,
            name, params;

        // function toObject(paramsResult) {
        //     return paramsResult[1].split("&").reduce((prev, cur) => {
        //         cur = cur.split("=");
        //         prev[cur[0]] = cur[1];
        //         return prev;
        //     }, {});
        // }
        if (testResult) {
            [name, params] = utils.parseLineToObject(testResult[0]);
            templateOption.test = params;
        }

        while (noticeResult = noticeReg.exec(clipboardContent)) {
            templateOption.notify[noticeResult[1]] = noticeResult[2];
        }


        if (paramsResult) {
            [name, params] = utils.parseLineToObject(paramsResult[0]);
            templateOption.params = params;
        }


        if (templateOption.test) {
            result = templateMaker.make({
                template: `${templateOption.template}
                        以上是生成的测试内容,生成文件需要(非必须)的$params就是$test时的所用的内容。
                    `,
                params: Object.entries(templateOption.test || {}).reduce((prev, cur) => {
                    return prev.concat({
                        name: cur[0],
                        type: "Object"
                    })
                }, []),
                notices: templateOption.notify,
                defaultValues: templateOption.test
            });
            keyboard.output(eval(`(${result})()`).compile({}, context));
        } else {
            if (!file) {
                keyboard.output("请指定file 或者 先测试。");
                return;
            }
            // if (!templateOption.params) {
            //     context.error("请指定$params 您可以将 $test 直接改为 $params");
            //     return;
            // }
            let fileAddr = path.join(remote.getGlobal("__dirname"), "../plugins/template/single-file", file);
            result = templateMaker.make({
                template: templateOption.template,
                params: Object.entries(templateOption.params || {}).reduce((prev, cur) => {
                    let value = cur[1];
                    value = Object.prototype.toString.call(value).slice(8, -1);
                    return prev.concat({
                        name: cur[0],
                        type: value
                    })
                }, []),
                notices: templateOption.notify,
            });
            let promise = Promise.resolve();
            if (fse.existsSync(fileAddr)) {
                promise = keyboard.options(`文件路径已经存在文件:${fileAddr},是否继续？`, ["是", "否"]).then((selects) => {
                    let select = selects[0];
                    if (select === 0) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    }
                });
            }
            promise.then(() => {
                fse.outputFileSync(fileAddr, jsBeautify.js(result));
                // 将这个 生成成功 替换为把 template语法去掉之后的原代码
                keyboard.output("生成成功");
            })
        }
    }}