function template() {

    return {
        parameters:{
            code: String,
        },
        requestLib:{

        },
        //放在文件夹里时有用
        events:{

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