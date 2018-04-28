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
                css: `
    .actions{
      display: flex;
      padding: r(30) 0;
      background-color: #fff;
      .action{
        flex: 1;
        text-align: center;
      }
    }`
            });
            return `
            
      <div class="actions">
        <div class="action">
          1
        </div>
        <div class="action">
          2
        </div>
      </div>
        `
        }
    }
}