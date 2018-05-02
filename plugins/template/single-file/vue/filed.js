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
        .field-box + .field-box{
          border-top: r(1) solid #efefef;
        }
        .field-box{
          padding: 0 r(30);
          line-height: 3.5em;
          background-color: #fff;
          display: flex;
          align-items: center;
          align-content: center;
          .field{
            color: #333;
            margin-right: r(30);
            text-align: right;
            width: 3em;
          }
          // value 可以用 readonly
          .input{
            flex: 1;
            color: #666;
          }
        }`
            });
            return `
            
      <div class="field-box">
        <span class="field">1234</span>
        <input class="input"/>
      </div>
        `
        }
    }
}