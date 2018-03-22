const {clipboard} = window.require('electron');

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

    const
        templates = [],
        tempClipboard = clipboard.readText(),
        content = clipboard.readText();
    let
        lineReg = /\S+/g,
        templateReg = /(\S+)\?/,
        line,
        commands = [];

    while (line = lineReg.exec(content)){
        line = line[1];
        let
            templateNameStr = templateReg.exec(line),
            [name,modifier] = templateNameStr.split("."),
            params;
        line = line.replace(templateNameStr[0],"");
        templateNameStr = templateNameStr[1];
        params = line.split("&");

        // 获取参数
        params = params.reduce((prev,cur)=>{
            cur = cur.split("=");
            let [name,value] = cur;

            if (!value) {
                value = name;
                name = undefined;
            }

            //将 a,b,c 变为数组
            value = value.split(",").map(i=>{
                // 获取参数的修饰器
                const [name,modifier] = i.split(".")
                return  {
                    name,
                    modifier
                }
            });
            if(value.length<=1){
                value =  value[0];
            }

            if (!value) {
                value = name;
                name = undefined;
                prev.rest.push(value);
            }else{
                prev.appoint[name] = value;
            }
             return prev
        },{
            appoint:{},
            rest:[]
        });


        commands.push({
            name:templateNameStr,
            params,
            modifier
        })
    }

}