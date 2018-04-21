
module.exports = {
    // 当外部环境已经准备好。
    created: {
        todo(account) {
            this.$invoke("login",account);
        },
        trigger() {
            // 用于识别外部环境是否准备好。

            //    是否已经在游戏中。
            let isOk = !!this.$dm.findPicEx("ready.bmp");
            if (isOk) {
                // (?:http|https):\/\/([^\/\s]+)\/?
                // "http://www.501wan.com/passport/sign/index.html?tourl=http%3A%2F%2Fwww.501wan.com%2Fstart%2F2217.html"
                // "http://www.501wan.com"
                let url = global.mainWindow.webContents.getURL();
                this.$log(url);
                return this.$accounts.getAccount(/((?:http|https):\/\/[^\/\s]+)\/?/.exec(url)[1]);
            }

        }
    },

    // 只能通过 $invoke 调用。
    methods: {
        login(account) {
            let ret = this.$dm.clickPic("account.bmp",{offsetX:100} );
            ret&&this.$dm.sendString(account.account);
            ret =  ret&&this.$dm.clickPic("password.bmp",{offsetX:100} )
            ret&&this.$dm.sendString(account.password);

            ret =  ret&&this.$dm.clickPic("login.bmp")

            return ret;
        },
    },

    //根 watch 。每个tick都会调用。
    //非根 watch,监听相应的data数据变化。
    watch:{
        offline:{
            todo(){

            },
            trigger(){

            }
        },
    },

    figure: {
        // data 和 computed 可以重名。 data只负责初始化+响应式。
        data() {
            // 从缓存中获取money值
            return {
                money: "",
                state: "idle",// recover running attack  => 使用位运算,
                purpose: "",
                name: ""
            }
        },
        //=== 每个 tick 都会调用,实时计算 ===== begin
        computed: {
            blood() {

            },
            position() {
                return {
                    x: 0,
                    y: 0,
                    mapName: ''
                }
            }
        },
        actions: {
            attack: {
                // 可以被主动调用,
                todo(point) {

                },
                // 每个tick会检测一次。用于主动触发和保证 热更新。
                trigger() {

                }
            },

        },
        //=== 每个 tick 都会调用,实时计算 ===== end
        watch: {},
    },

    task: {
        data: {},
        computed: {},
        area: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        contents: [
            {
                string: "告别长老",
                // 用于识别当前是否属于这一个阶段
                identify() {

                }
            }
        ],
        onTask: {
            begin(task) {

            },
            change(task) {

            },
            end(task) {

            }
        },
    },

    map: {
        area: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
    }
}
