const dmWrapper = require("./damo").dmWrapper;
const accounts = require("./accounts");
let
    mainLoop,
    createdTick,
    tickTime = 1300;
module.exports = function (config) {
    clearInterval(mainLoop);
    clearInterval(createdTick);
    let
        isStop = true,
        instance = {
            $triggers: {},
            $dm: Object.entries(dmWrapper).reduce((prev,cur)=>{
                prev[cur[0]] = function(...params){
                    let result = cur[1].bind(instance.$dm)(...params);
                    instance.$log(cur[0],params,result);
                    return result;
                }
                return prev;
            },{}),
            $accounts: {
                getAccount(url) {
                    let account = accounts[url][0];
                    instance.$log("getAccount", url, account && account.account);
                    return account;
                }
            },
            $invoke(func, ...params) {
                let {methods = {}} = config;
                let funcName = func;
                func = () => {
                    let tempFunc = methods[funcName]||(()=>true);

                        instance.$log(funcName);
                        return tempFunc.bind(instance)(...params)
                }
                if (!func()) {
                    let handle = setInterval(() => {
                        if (func()) {
                            clearInterval(handle);
                        }
                    }, tickTime);
                }
            },
            $browser: {
                $: 0,
                openUrl(url) {
                    instance.$log("openUrl", url);
                    global.mainWindow.loadURL(url);
                }
            },
            $error(...params) {
                let mainWindow = global.mainWindow;
                mainWindow && mainWindow.webContents.executeJavaScript(`console.error('${params.join(" ")}');`);
                console.error(...params);
            },
            $log(...params) {
                let mainWindow = global.mainWindow;
                mainWindow && mainWindow.webContents.executeJavaScript(`console.log('${params.join(" ")}');`);
                console.log(...params);
            }
        }
    return {
        instance,
        start() {
            if (isStop) {
                isStop = false;
                let created = config.created;
                createdTick = setInterval(() => {
                    instance.$log("game starting");
                    let trigger = created.trigger.bind(instance)();
                    if (trigger) {
                        clearInterval(createdTick);

                        // let {methods = {}} = config;
                        // Object.entries(methods).forEach(item => instance[item[0]] = item[1])
                        created.todo.bind(instance)(trigger);
                        //
                        let computedHandle = item => {
                                instance.$triggers[item[0]] = {
                                    todo(value) {

                                    },
                                    trigger: item[1].bind(instance)
                                };
                            },
                            actionsHandle = item => {
                                let value = item[1];
                                if (value instanceof Function) {
                                    //     仅仅提供主动调用
                                } else {
                                    instance.$triggers[item[0]] = value;
                                }
                            };

                        let {figure = {}, map = {}, task = {}} = config;
                        let {computed: figureComputed = {}, actions: figureActions = {}} = figure;
                        let {computed: mapComputed = {}, actions: mapActions = {}} = map;
                        let {computed: taskComputed = {}, actions: taskActions = {}} = task;

                        Object.entries(figureComputed).forEach(computedHandle);
                        Object.entries(figureActions).forEach(actionsHandle);
                        Object.entries(mapComputed).forEach(computedHandle);
                        Object.entries(mapActions).forEach(actionsHandle);
                        Object.entries(taskComputed).forEach(computedHandle);
                        Object.entries(taskActions).forEach(actionsHandle);


                        instance.$log("script runing");
                        mainLoop = setInterval(() => {
                            if (isStop) {
                                instance.$log("script stop");
                                clearInterval(mainLoop);
                                return;
                            }

                            Object.values(instance.$triggers).forEach(item => {
                                let trigger = item.trigger();
                                if (trigger) {
                                    item.todo(trigger);
                                }
                            })
                        }, tickTime)
                    }
                }, tickTime);
            }
        },
        // 暂停毫无意义，整个脚本都是无状态的。stop即是暂停。
        // pause(){
        //
        // },
        // resume() {
        //
        // },
        stop() {
            isStop = true;
        }
    }
}