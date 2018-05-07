import {TemplateJSFile} from "../../views/ProjectTemplate";
import store from "../../store/index"
import keyboard from "../vbs/keyboard";
import templateMaker from "../templateMaker";


const {clipboard, remote} = window.require('electron');
const glob = remote.require("glob").sync;
const fse = remote.require("fs-extra");
const path = remote.require("path");
const child_process = remote.require("child_process");
const jsBeautify = remote.require("js-beautify");
const {parse} = remote.require("himalaya");

// const robot = remote.require("robotjs");
// const ks = remote.require("node-key-sender");


const utils = {
    /**
     *
     * @param line
     * @return [objectName,object]
     * 其中 object 格式为
     *         {
     *               modifier:'file',
     *               fields:['姓名','年龄','性别','职业'],
     *               operation:[{
     *                   value:'删除',
     *                   modifier:'confirm'
     *               },"更新"],
     *               rest:[],
     *               其他命令
     *               $notify:{
     *
     *               }
     *           }
     *  除了command的名字外，都在object中。
     */
    parseLineToObject(line) {
        let
            templateNameReg = /(?:(\S+)\?)|(?:(.+))/,
            templateNameStr = templateNameReg.exec(line);
        templateNameStr = templateNameStr.filter(i => i);
        let
            [name, modifier] = templateNameStr[1].split("."),
            tempParams,
            params = JSON.parse(JSON.stringify({modifier, rest: []}));

        line = line.replace(templateNameStr[0], "");
        tempParams = line.split("&");

        // 获取参数
        tempParams.reduce((prev, cur) => {
            cur = cur.split("=");
            let [name, value] = cur;
            let originValue = value;
            if (!value) {
                value = name;
                name = undefined;
            }

            //将 a,b,c 变为数组
            value = value.split(/[,，]/).map(i => {
                // 获取参数的修饰器
                const [name, modifier] = i.split(".")
                return modifier ? {
                    name,
                    modifier
                } : name
            });

            if (value.length <= 1) {
                value = value[0];
            }

            if (!originValue) {
                prev.rest = prev.rest.concat(value);
            } else {
                let [tempName, modifier] = name.split(".");
                prev[tempName] = modifier ? {modifier, value} : value;
            }
            return prev
        }, params);

        return [name, params];
    }
}


export default function () {

    // 2018-4-28
    // $css`<div class="a">                                 .a{
    //      <div class="b">                 =>                  .b{
    //          <div class="c"></div>                               .c{}            生成成功则去掉 $css 包裹
    //      </div>                                               }
    // </div>`                                               }


    // 2018-3-28
    // set?$$0=多行内容

    //
    // $template`asdf`?                                必须以 `?结尾
    // $template`asdf`?file=./vue/cell                 // 用 `` 包裹,方便利用编辑器的智能提示来写模板。 file可以输入相对路径来生成文件。   cell 这个名字参考了有赞小程序库
    // $params?labels=Array&
    // $test
    // $test?[1,2,3,4,5]            // 当有test存在时,只输出测试error和成功内容，不生成文件。如果test不存在则成功时生成文件。
    // $$notify``


    // template.demo = >    <style lang="scss">
    //                                $$css`
    //                                 .menu-panel{
    //                                         border-top: r(1) solid #e4e4e4 ;
    //                                         border-bottom: r(1) solid #e4e4e4 ;
    //                                         background-color: #fff;
    //                                         margin-bottom: r(30);
    //                                     .menu-item+.menu-item{
    //                                             border-top: r(1) solid #e4e4e4 ;
    //                                         }
    //                                     .menu-item{
    //                                             display: flex;
    //                                             padding-left: r(55);
    //                                             line-height: 3em;
    //                                             text{
    //                                                 flex: 1;
    //                                             }
    //                                         .iconfont{
    //                                                 font-size: r(30);
    //                                                 margin-right: r(20);
    //
    //                                             &.icon-right{
    //                                                     float: right;
    //                                                     color: #aaa;
    //                                                     font-size: r(25);
    //                                                 }
    //                                             }
    //                                         }
    //                                     }
    //                                  `
    //                      </style>
    //                      <template>
    //                          $template`
    //                          <view class="menu-panel">
    //                             ${labels.map(i=>`<view class="menu-item"><view class="iconfont"/><text>${i}</text> <view class="iconfont icon-right" /></view>`).join("\r\n")}
    //                          </view>
    //                         `?file=./vue/test.js
    //                          $test?labels=我的优惠券,我的优惠码,我的积分,管理账号
    //                      </template>


    // templates


    // 2018-02-02

    // SideContainer?p=路演管理，公司管理，人员管理，审批管理&i=icon-right,icon-other

    // SideContainer?groups=审核，公司管理&groups$0=身份认证,IR团队认证,groups$1

    //  or SideContainer?路演管理，公司管理，人员管理，审批管理&icon-right,icon-other
    //  or $configName?路演管理，公司管理，人员管理，审批管理&icon-right,icon-other

    // form?fields=姓名，年龄，性别，职业&notify='D:\code\github\api-tools\plugins\project-templates\ant-admin\src'
    //   or form?filed=姓名，年龄，性别，职业&notify='$formDir'

    //  ===
    //   or form.demo  => form?fields=姓名，年龄，性别，职业&notify='D:\code\github\api-tools\plugins\project-templates\ant-admin\src'
    //  ===


    // 也可以notify当前文件
    // randomSlot => crg_add_crg
    // randomSlot => crg_update_crg
    // Form?filed=姓名，年龄，性别，职业
    // notify?path='D:\code\github\api-tools\renderer\src\js\clipboardMan.js'&slots=$$0,$$1    其中 $$0,$$1 是最近记录中生成的slot
    // 也可以  $$0  $$1 直接拿到最近记录中生成的slot


    // form.file?fields=姓名，年龄，性别，职业&output=D:\code\github\api-tools\renderer\src\js


    // table?column=姓名，年龄，性别，职业&operation=删除.confirm     字段后面跟点 代表附加信息，一般是类型

    // api?/api/base/getUserInfo.base =>
//                                       1、您没有配置实际项目地址,请输入项目地址：$projectAddr。
//                                       2、setEnv?$projectAddr&D:\code\github\api-tools


    // ks.sendKeys(['a', 'b', 'c']);


    // 每一行都可以解析成对象
    let
        tempClipboardContent = clipboard.readText(),
        clipboardContent,
        output = keyboard.output,
        context = {
            error(msg) {
                output(`error:${msg}`);
            },
            showOptionsForResult(list) {
                return keyboard.options('有多个地址,请选择其中一个', list);
            },
            notify(path, events, params, options) {
                if (params) {
                    // 测试时暂时这么写。
                    store.dispatch({
                        type: "NOTICE_ADD",
                        notice: {
                            path, events, params, options
                        }
                    })
                }
            }
        };

    // child_process.execSync("wscript ./main/test.vbs");
    child_process.execSync("wscript ./main/copy.vbs");
    clipboardContent = clipboard.readText();


    try {
        let
            lineReg = /.+/g,
            noticeReg = /\$\$([0-19])/,
            templateReg = /\$template`([\s\S]+?)`\?(?:file=(\S+))?/,
            cssReg = /^\$css`([\s\S]+?)`/,//\$[^\$]\S*
            classTag = /<[^\/\n]+[^:]class="(.+?)"[^\/\n]*>/,
            multiParamsReg = /`([\s\S]+?)`/g,
            line,
            variables = {},
            commandOption = {};


        // 优先判断的指令
        // $template
        // $css

        let templateResult = templateReg.exec(clipboardContent);

        if (templateResult) {

            let
                templateOption = {
                    template: templateResult[1],
                    notify: {}
                },
                file = templateResult[2],
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
                templateResult = templateMaker.make({
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
                output(eval(`(${templateResult})()`).compile({}, context));
            } else {
                if (!file) {
                    context.error("请指定file 或者 先测试。");
                    return;
                }
                // if (!templateOption.params) {
                //     context.error("请指定$params 您可以将 $test 直接改为 $params");
                //     return;
                // }
                let fileAddr = path.join(remote.getGlobal("__dirname"), "../plugins/template/single-file", file);
                templateResult = templateMaker.make({
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
                    fse.outputFileSync(fileAddr, jsBeautify.js(templateResult));
                    // 将这个 生成成功 替换为把 template语法去掉之后的原代码
                    keyboard.output("生成成功");
                })
            }

            return;
        }
        else {
            let
                htmlResult = cssReg.exec(clipboardContent);
            if (htmlResult) {
                let html = parse(htmlResult[1]);

                function generateCss(elements=[]){
                    return elements.map(item=>{
                        let attributes = item.attributes || [];
                        let css = attributes.find(i=>i.key==='class');
                        if(css){
                            css = css.value;
                        }
                        return css?`.${css}{
                            ${generateCss(item.children)}
                        }`:generateCss(item.children)
                    }).filter(i=>i).join("\r\n")
                }
                // 当生成成功时,去掉$css``
                output(htmlResult[1]);
                let cssResult = generateCss(html);
                console.log(cssResult);
                clipboard.writeText(cssResult);
                return;
            }
        }


        // 多行参数命令特殊,需要放在代码前头处理。
        // let index = 0;
        // clipboardContent.replace(multiParamsReg, (match, extract, index, source) => {
        //     let key = `$$_${index++}`;
        //     variables[key] = extract;
        //     return match.replace(extract, key)
        // });


        //  第一行是命令,第二行开始
        while (line = lineReg.exec(clipboardContent)) {
            line = line[0];

            let [name, params] = utils.parseLineToObject(line);

            commandOption[name] = params;
        }
        console.log(commandOption);

        // 开始编译
        if (JSON.stringify(commandOption) === '{}') {
            return;
        }

        // 从这里开始,有了context变量。
        let
            entries = Object.entries(commandOption),
            [commandName, commandParams] = entries[0];


        // 一、单独使用 $$0 的情况
        //$$0.add
        //$$0.update
        // 二、使用notices查看notices列表

        // 一些功能性的指令
        let
            regResult,
            modifier = commandParams.modifier,
            fileAddr;

        switch (true) {
            case !!(regResult = noticeReg.exec(commandName)):
                regResult = regResult[1];
                let notice = store.getState().notices[regResult];

                // keyboard.output(`\r\n${modifier ? notice.params[modifier] : notice}\r\n`);
                keyboard.output(`${modifier ? notice.params[modifier].trim() : notice}`);
                return;
            case commandName === 'notices':
                let {notices} = store.getState();
                keyboard.output("\r\n" + notices.map((item, index) => `$$${index}：${JSON.stringify(Object.entries(item.params).reduce((prev, cur) => {
                    prev[cur[0]] = modifier ? cur[1].slice(0, modifier) : '...';
                    return prev;
                }, {}))}`).join('\r\n') + "\r\n");
                return;
            case commandName === 'templates':
                if (modifier) {
                    fileAddr = path.join(remote.getGlobal("__dirname"), `../plugins/template/single-file/**/${modifier}/**.js`);
                } else {
                    fileAddr = path.join(remote.getGlobal("__dirname"), "../plugins/template/single-file/**/**.js");
                }
                let templates = glob(fileAddr);
                keyboard.output("\r\n目前的模板列表如下：\r\n" + templates.map((item, index) => `${index + 1}：${item}`).join('\r\n') + "\r\n");
                return;
            case commandName === 'set':
                // 名字需要以$开头。
                // set?$$0=asdfasd&$sc=SideContainer
                return;
            default:
                break;
        }

        if (modifier === 'file') {
            fileAddr = path.join(remote.getGlobal("__dirname"), `../plugins/template/projects/**/*${commandName}*.js`);
        } else {
            fileAddr = path.join(remote.getGlobal("__dirname"), `../plugins/template/single-file/**/*${commandName}*.js`);
        }


        const
            addrs = glob(fileAddr);


        if (addrs.length) {
            let
                promise,
                addr;
            if (addrs.length > 1) {
                promise = context.showOptionsForResult(addrs).then(selects => addrs[selects[0]])
            } else {
                addr = addrs[0];
                promise = Promise.resolve(addr);
            }

            promise.then(addr => {

                let template = fse.readFileSync(addr, 'utf-8');
                try {
                    template = eval(`(${template})`)();
                } catch (e) {
                    console.error(e);
                    context.error(e.message);
                    return;
                }

                let parameters = template.parameters;

                if (commandParams.modifier === 'demo') {
                    JSON.stringify(Object.entries(parameters).map(i => i[0]))
                    output(`${commandName}?${Object.entries(parameters).map(i => {
                        let example = '';
                        let key = i[0];
                        if (key !== 'rest') {
                            switch (i[1]) {
                                case Array:
                                    example = `${key}=1,2,3,4`;
                                    break;
                                case String:
                                    example = `${key}=${key}`;
                                    break;
                                default:
                                    break;
                            }
                        }
                        return example;
                    }).filter(i => i).join("&")}`);
                    return;
                }

                let templateParams = {modifier: commandParams.modifier};
                Object.entries(parameters).forEach(item => {
                    let name = item[0];
                    let value = commandParams[name];
                    if (value) {
                        templateParams[name] = value;
                    } else {
                        templateParams[name] = commandParams.rest.shift() || undefined;
                    }
                })

                console.log("模板参数：", templateParams);

                try {
                    let result = template.compile(templateParams, context);
                    output(result.trim());
                } catch (e) {
                    console.error(e);
                    context.error(e.message);
                }


            })
        } else {
            context.error(`找不到命令：${commandName}`)
        }


        clipboard.writeText(tempClipboardContent);
    } catch (e) {
        console.error(e);
        context.error(e.message);
    }
}