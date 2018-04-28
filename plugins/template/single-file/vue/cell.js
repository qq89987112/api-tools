function template() {

    return {
        parameters: {
            rest: Array,
            items: Array
        },
        requestLib: {

        },
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {
                rest = [1], items = [1]
            } = params;

            context && context.notify(undefined, undefined, {
                css: `
    .cell + .cell{
      border-top: r(1) solid #efefef;
    }
    .cell{
      display: flex;
      align-items: center;
      align-content: center;
      padding: 0 r(30);
      line-height: 2.5em;
      background-color: #fff;
      .iconfont{
        margin-right: r(20);
      }
      .text{
        flex: 1;
      }
      .icon-right{
        font-size: 0.8em;
        color: #999;
      }
    }`
            });
            return `
            ${items.map(i=>`<div class="cell">
      <i class="iconfont"></i>
      <span class="text">${i}</span>
      <i class="iconfont icon-right"/>
    </div>`).join("\r\n")}
        `
        }
    }
}