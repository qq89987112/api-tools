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
  data(){
    return {
      tab:0
    }
  },`,
                css: `
  .tabs{
    display: flex;
    background-color: #fff;
    .tab{
      flex: 1;
      text-align: center;
      padding: r(20) 0;
      &.active{
        color: #ee5544;
        position: relative;
        &:after{
          content: '';
          display: inline;
          position: absolute;
          bottom: r(6);
          height: r(2);
          left: r(10);
          right: r(10);
          background-color: #ee5544;
        }
      }
    }
  }
  .tab-contents{
    .tab-content{
      
    }
  }
  `
            });
            return `
            
    <div class="tabs">
      <div class="tab" @click="tab=0" :class="tab===0&&'active'">综合</div>
      <div class="tab" @click="tab=1" :class="tab===1&&'active'">新品</div>
      <div class="tab" @click="tab=2" :class="tab===2&&'active'">销量</div>
      <div class="tab" @click="tab=3" :class="tab===3&&'active'">价格</div>
      <div class="tab" @click="tab=4" :class="tab===4&&'active'">筛选</div>
    </div>
    <div class="tab-contents">
      <div class="tab-content" v-show="tab===0">综合</div>
      <div class="tab-content" v-show="tab===1">新品</div>
      <div class="tab-content" v-show="tab===2">销量</div>
      <div class="tab-content" v-show="tab===3">价格</div>
      <div class="tab-content" v-show="tab===4">筛选</div>
    </div>
        `
        }
    }
}