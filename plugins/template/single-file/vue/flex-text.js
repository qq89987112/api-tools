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
      background-color: #fff;
      .action{
        padding: r(20) 0;
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