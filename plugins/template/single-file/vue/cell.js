function template() {

    return {
        parameters: {
            rest: Array,
            labels: Array
        },
        requestLib: {

        },
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {
                rest = [1, 2, 3, 4, 5], labels = [1, 2, 3, 4, 5]
            } = params;

            context && context.notify(undefined, undefined, undefined);
            return `
            
    //                          <view class="menu-panel">
    //                             ${labels.map(i=>`<view class="menu-item"><view class="iconfont"/><text>${i}</text> <view class="iconfont icon-right" /></view>`)}
    //                          </view>
    //                         
        `
        }
    }
}