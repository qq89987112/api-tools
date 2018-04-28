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
  mounted(){
    this.activeHeight = 0;
    wx.createSelectorQuery().selectAll('.toggle-content-wrapper').boundingClientRect(rect=>{
      this.activeHeight = rect.length&&rect[0].height || 0;
    }).exec();
  },
  methods:{
    onCellClick(){
      if (this.height) {
        this.height = 0;
      }else{
        this.height = this.activeHeight;
        console.log(this.height);
      }
    }
  }`,
                css: `
  .cell-toggle-box{
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
      .icon-down{
        margin-right: r(20);
        font-size: 0.8em;
        color: #999;
        transition:  0.3s transform cubic-bezier(0.12, 0.4, 0.29, 1.46);

        &.active{
          transform: rotate(180deg);
        }
      }
      .text{
        flex: 1;
      }
      .icon-right{
        font-size: 0.8em;
        color: #999;
      }
    }

    .toggle-content{
      transition: 0.3s height cubic-bezier(0.12, 0.4, 0.29, 1.46);
      overflow:hidden;
      background-color: #efefef;
    }
  }`
            });
            return `
            
    <div class="cell-toggle-box">
      <div class="cell" @click="onCellClick">
        <i class="iconfont"></i>
        <span class="text">1</span>
        <i class="iconfont icon-down" :class="height&&'active'"/>
      </div>
      <div class="toggle-content" :style="{height:height+'px'}">
        <div class="toggle-content-wrapper">
          <p>1231231231</p>
          <p>1231231231</p>
          <p>1231231231</p>
        </div>
      </div>
    </div>
        `
        }
    }
}