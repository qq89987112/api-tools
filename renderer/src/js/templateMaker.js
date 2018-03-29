export default {
    // params = [
    //          {
    //              name:'name',
    //              type:'type'
    //          }
    //      ]
    make({template, params = [], defaultValues}) {
        let typeDefaultValues = {
            Object: '{a:1,b:2,c:3}',
            Array: '[1,2,3,4,5]',
            Number: '123',
            String: '"12345"'
        };
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
        return \`
            ${template}
        \`
    }
}
}`;
    }
}