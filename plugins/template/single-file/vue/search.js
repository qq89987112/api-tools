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
  .search-wrapper{
    padding:0 r(20);
    background-color: #fff;
    .search-box{
      background-color: #f5f6f7;
      display: flex;
      align-items: center;
      align-content: center;
      padding: 0 r(15);
      .iconfont{
        margin-right:r(15);
      }
      .search-input{
        flex: 1;
      }
    }
  }`
            });
            return `
            
    <div class="search-wrapper">
      <div class="search-box">
        <i class="iconfont icon-cx"/>
        <input class="search-input" type="text">
      </div>
    </div>
        `
        }
    }
}