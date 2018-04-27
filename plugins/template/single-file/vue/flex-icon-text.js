function template() {

    return {
        parameters: {
            rest: Array,
            actions: Array
        },
        requestLib: {

        },
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {
                rest = [1, 2, 3, 4, 5], actions = [1, 2, 3, 4, 5]
            } = params;

            context && context.notify(undefined, undefined, {
                css: `
    .actions{
      display: flex;
      padding: r(30) 0;
      background-color: #fff;
      .action{
        flex: 1;
        text-align: center;
        .iconfont{
          font-size: r(40);
          margin-bottom: r(10);
        }
      }
    }`
            });
            return `
            <div class="actions">
      ${
        actions.map((i,idx)=>`<div class="action">
        <div class="iconfont" @click="onActionTap(${idx})"/>
        <div>${i}</div>
        </div>
        `).join("")
      }
    </div>
        `
        }
    }
}