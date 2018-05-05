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
                template: `
        <p class="radios">
          <span class="radio" :class="radio===0&&'active'" @click="radio=0">10L</span>
          <span class="radio" :class="radio===1&&'active'" @click="radio=1">12L</span>
        </p>`,
                js: `
        radio:0,`,
                css: `
        .radios{
          .radio + .radio{
            margin-left: r(30);
          }
          .radio{
            border: r(1) solid #e7e7e7;
            border-radius: r(8);
            line-height: 2em;
            padding: 0 r(20);
            display: inline-block;

            &.active{
              border-color:currentColor;
              color: #ee5544;
            }
          }
        }`
            });
            return `
            
        <p class="radios">
          <span class="radio" :class="radio===0&&'active'" @click="radio=0">10L</span>
          <span class="radio" :class="radio===1&&'active'" @click="radio=1">12L</span>
        </p>
        `
        }
    }
}