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
                js: `
        list:[
          {
          },
          {
          }
        ]`,
                css: `
      .list{
        .item + .item{
          border-top: r(1) solid #f0f0f0;
        }
        .item{
          background-color: #fff;
          padding: r(30);
          .title{
          }
          .content{
            margin-top: r(8);
            color: #aaa;
          }
        }
      }`
            });
            return `
            
    <div class="list">
      <div class="item"  v-for="item in list">
        <div class="title">title</div>
        <div class="content">content</div>
      </div>
    </div>
        `
        }
    }
}