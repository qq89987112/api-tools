import store from "../../../store";
export default {
    notify(path, events, params, options) {
        if (params) {
            // 测试时暂时这么写。
            store.dispatch({
                type: "NOTICE_ADD",
                notice: {
                    path, events, params, options
                }
            })
        }
    }
}