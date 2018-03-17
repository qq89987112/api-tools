function template() {

    return {
        parameters:{
            code: String,
        },
        requestLib:{

        },
        //放在文件夹里时有用
        events:{
            // 1、模板项目：当前文件夹相对路径 （不需要，肉眼都能看。）
            // 2、对应项目：项目根目录 （可以通过模板的当前文件夹整合出对应的路径）
            eventsName:(params,{projectAddr,context,fse,glob,path})=>{
                let arr = glob(path.join(projectAddr,"src/views/**Page.js"))
                arr.forEach(item=>{
                    let content = fse.readFileSync(item,"utf-8");
                    content = content.replace(/(\/\*<Form.Item><Button htmlType='submit' type='primary'>新增<\/Button><\/Form.Item>\*\/)/,
                        (match,extart)=>{
                            return match.replace(extart,params.add)
                        }).replace(/\{title:'操作':render:\(\)=><p>(\/\*<Button>修改<\/Button>\*\/)<p>\}/,
                        (match,extart)=>{
                            return match.replace(extart,params.update)
                        })
                    fse.outputFileSync(item,content);
                })
            }
        },
        compile(params,context) {
            const {code=''} = params;
            return `
function template() {

    return {
        parameters:{
            className: String,
            labels: Array,
            fields: Array,
            fieldValids: Array,
        },
        requestLib:{

        },
        compile(params) {
            const {fields =[], className="", fieldValids=[], labels=[]} = params;
            const
                className2 = className.replace(/^\\S/,s=>s.toLowerCase()),
                fieldsTypeMap = fields.reduce((prev,cur)=>{
                    cur = cur.split(".");
                    prev[cur[0]] = cur.slice(-1)[0];
                    return prev;
                },{});

            return \`
${code}
            \`
        }
    }
}
            `
        }
    }
}