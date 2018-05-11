import keyboard from "./js/keyboard";
import utils from "./js/utils";
import directives from "./directives";
import context from "./js/context";
const {clipboard, remote} = window.require('electron');
const glob = remote.require("glob").sync;
const fse = remote.require("fs-extra");
const path = remote.require("path");
const child_process = remote.require("child_process");




export default function () {
    // 2018-05-11
    // 主要是以 ui测试api 为驱动。
    //
    // 全局变量要求填写notifyApiFolder
    // $api?url='/edit/title'&file='title'   =>  title.title().then(d=>{
    //
    //                                                  })
    //     //$api.list?test='/edit/title' 生成list页面
    //
    //


    // 2018-05-10
    // 新增行情接口
    // http://hq.sinajs.cn/list=M0
    //

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
        clipboardContent;

    // child_process.execSync("wscript ./main/test.vbs");
    child_process.execSync("wscript ./main/copy.vbs");
    clipboardContent = clipboard.readText();


    try {

        let
            lineReg = /.+/g,
            line,
            commandOption = {};


        if (Object.values(directives).find(i => {
            let reg = i.validate;
            let result = reg.exec(clipboardContent);
            if (result) {
                i.handle(result);
            }
            return result;
        })) {
            return;
        }


        //  模版命令解析开始。
        //  默认支持多行格式。
        //  Form?filed=姓名，年龄，性别，职业
        //  notify?path='D:\code\github\api-tools\renderer\src\js\clipboardMan.js'&slots=$$0,$$1    其中 $$0,$$1 是最近记录中生成的slot
        //  第二行开始是复杂参数的解析

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
            [commandName, commandParams] = entries[0],
            modifier = commandParams.modifier,
            fileAddr;


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
                promise = keyboard.options('有多个地址,请选择其中一个', addrs).then(selects => addrs[selects[0]])
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
                    keyboard.output(e.message);
                    return;
                }

                let parameters = template.parameters;

                if (commandParams.modifier === 'demo') {
                    JSON.stringify(Object.entries(parameters).map(i => i[0]));
                    keyboard.output(`${commandName}?${Object.entries(parameters).map(i => {
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
                });

                console.log("模板参数：", templateParams);

                try {
                    let result = template.compile(templateParams, context);
                    keyboard.output(result.trim());
                } catch (e) {
                    console.error(e);
                    keyboard.output(e.message);
                }
            })
        } else {
            keyboard.output(`找不到命令：${commandName}`)
        }


        clipboard.writeText(tempClipboardContent);
    } catch (e) {
        console.error(e);
        keyboard.output(e.message);
    }
}