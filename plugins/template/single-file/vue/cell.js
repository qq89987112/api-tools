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

            });
            return `
            
    //                          <view class="menu-panel">
    //                             ${labels.map(i=>`<view class="menu-item"><view class="iconfont"/><text>${i}</text> <view class="iconfont icon-right" /></view>`).join("\r\n")}
    //                          </view>
    //                         
        `
        }
    }
}