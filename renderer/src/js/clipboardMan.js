import {TemplateJSFile} from "../views/ProjectTemplate";

const {clipboard, remote} = window.require('electron');
const glob = remote.require("glob").sync;
const fse = remote.require("fs-extra");
// const robot = remote.require("robotjs");
// const ks = remote.require("node-key-sender");

export default function () {
    // SideContainer?p=路演管理，公司管理，人员管理，审批管理&i=icon-right,icon-other
    //  or SideContainer?路演管理，公司管理，人员管理，审批管理&icon-right,icon-other
    //  or $configName?路演管理，公司管理，人员管理，审批管理&icon-right,icon-other

    // Form?fields=姓名，年龄，性别，职业&notify='D:\code\github\api-tools\plugins\project-templates\ant-admin\src'
    //   or Form?filed=姓名，年龄，性别，职业&notify='$formDir'
    // 也可以notify当前文件
    // randomSlot => crg_add_crg
    // randomSlot => crg_update_crg
    // Form?filed=姓名，年龄，性别，职业
    // notify?path='D:\code\github\api-tools\renderer\src\js\clipboardMan.js'&slots=$$0,$$1    其中 $$0,$$1 是最近记录中生成的slot
    // 也可以  $$0  $$1 直接拿到最近记录中生成的slot


    // form.file?fields=姓名，年龄，性别，职业&output=D:\code\github\api-tools\renderer\src\js


    // Table?column=姓名，年龄，性别，职业&operation=删除.confirm     字段后面跟点 代表附加信息，一般是类型

    // api?/api/base/getUserInfo.base =>
//                                       1、您没有配置实际项目地址,请输入项目地址：$projectAddr。
//                                       2、setEnv?$projectAddr&D:\code\github\api-tools


    // ks.sendKeys(['a', 'b', 'c']);


    // 每一行都可以解析成对象
    const
        templates = [],
        clipboardContent = clipboard.readText();
    let
        lineReg = /\S+/g,
        templateReg = /(\S+)\?/,
        line,
        commandOption = {
            // 循环中的第一个就是command名，其他是big params, 可以通过 .modifier 是否存在来判断是否有modifier。
            // Table:{
            //     modifier:'file',
            //     fields:['姓名','年龄','性别','职业'],
            //     operation:[{
            //         value:'删除',
            //         modifier:'confirm'
            //     },"更新"],
            //     rest:[]
            // }
        };

    //  第一行是命令,第二行开始
    while (line = lineReg.exec(clipboardContent)) {
        line = line[0];
        let
            templateNameStr = templateReg.exec(line);
        if (!templateNameStr) {
            console.error('读不到函数名字', line);
            break;
        }
        let
            [name, modifier] = templateNameStr[1].split("."),
            tempParams,
            params = JSON.parse(JSON.stringify({modifier, rest: []}));
        commandOption[name] = params;


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
    }
    console.log(commandOption);
    let entries = Object.entries(commandOption);
    let [commandName, commandParams] = entries[0];
    let fileAddr = `D:\\code\\github\\api-tools\\plugins\\template\\single-file\\ant\\${commandName}.js`;
    if (fse.existsSync(fileAddr)) {
        let jsFile = new TemplateJSFile(fileAddr);
        let parameters = jsFile.instance.parameters;
        let useParams = {modifier:commandParams.modifier};
        for (let name of parameters) {
            let value = commandParams[name];
            if (value) {
                useParams[name] = value;
            }else{
                useParams[name] = commandParams.rest.shift();
            }
        }
    }
}