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
            date:"6月22日 22:36",
            $showDate:true,
            $from:"other",// self
            content:"您好,请问有什么可以为您服务的吗?"
          },
          {
            date:"6月22日 22:36",
            $showDate:false,
            $from:"self",// self
            content:"请问巴拉巴拉"
          }
        ]`,
                css: `
    .msg-list{
      padding: 0 r(30);

      .msg-item + .msg-item{
        margin-top: r(20);
      }
      .msg-item{

        .msg-time{
          line-height: 3em;
          text-align: center;
          color: #aaa;
        }

        .msg{
          background-color: #fff;
          border-radius: r(9999);
          display: inline-block;
          padding: r(14) r(20);
          box-shadow: 0 r(4) r(20) #e4e4e4;
        }

        &:not(.self){
          .msg{
            border-top-left-radius: 0!important;
          }
        }

        &.self{
          text-align: right;
          .msg{
            background-color: #ee5544;
            color: white;
            border-top-right-radius: 0!important;
          }
        }
      }
    }`
            });
            return `
            
    <div class="msg-list">
      <div class="msg-item"  v-for="msg in list"  :class="msg.$from">
        <div class="msg-time" v-if="msg.$showDate">{{msg.date}}</div>
        <div class="msg">{{msg.content}}</div>
      </div>
    </div>
        `
        }
    }
}