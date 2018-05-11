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
    .buttons{
      .button + .button{
        margin-left: r(30);
      }
      .button{
        background-color: #ee5544;
        border-radius: r(8);
        line-height: 2em;
        padding: 0 r(20);
        display: inline-block;
        color: white;
        cursor: pointer;
      }
    }`
            });
            return `
            
        <p class="buttons">
          <span class="button">删除订单</span>
          <span class="button">查看物流</span>
          <span class="button">再次购买</span>
        </p>
        `
        }
    }
}