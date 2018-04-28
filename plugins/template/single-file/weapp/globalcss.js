function template() {

    return {
        parameters: {

        },
        requestLib: {

        },
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {} = params;

            context && context.notify(undefined, undefined, {

            });
            return `
            [class$=page]{
    font-size: r(26);
    background-color: #f4f4f4;
    height: 100vh;
    overflow-y: auto;
    color: #555;
  }
        `
        }
    }
}