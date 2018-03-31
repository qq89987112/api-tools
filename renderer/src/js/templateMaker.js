export default {
    // params = [
    //          {
    //              name:'name',
    //              type:'type'
    //          }
    //      ]
    make({template, params = [], defaultValues,notices={}}) {
        let typeDefaultValues = {
            Object: '{a:1,b:2,c:3}',
            Array: '[1,2,3,4,5]',
            Number: '123',
            String: '"12345"'
        };

        if (defaultValues) {
            defaultValues = Object.entries(defaultValues).reduce((total,cur)=>{
                let
                    value = cur[1],
                    type = Object.prototype.toString.call(value);

                switch (type){
                    case "[object Array]":
                        value = `[${value.map(i=>`"${i}"`)}]`;
                        break;
                    case "[object String]":
                        value = `"${value}"`;
                        break;
                    case "[object Number]":
                        break;
                    case "[object Object]":
                        value = JSON.stringify(value)
                        break;
                    default:
                        break;
                }
                total[cur[0]] = value;
                return total;
            },{})
        }

        // 不能用这个, 多行字符串将丢失
        // notices = JSON.stringify(notices,undefined,'\t');
        let objectKeyValue = Object.entries(notices).map((cur)=>{
             return `${cur[0]}:\`${cur[1]}\``
        }).join(",\r\n");

        notices = `{
                ${objectKeyValue}
        }`;


        return `
                function template() {

return {
    parameters:{
        ${params.map(i => `${i.name}:${i.type}`)}
    },
    requestLib:{

    },
    //放在文件夹里时有用
    events:{
    },
    compile(params,context) {
        const {${params.map(i => `${i.name}=${defaultValues ? defaultValues[i.name] : typeDefaultValues[i.type]}`)}} = params;
        
         context&&context.notify(undefined,undefined,${notices});
        return \`
            ${template}
        \`
    }
}
}`;
    }
}