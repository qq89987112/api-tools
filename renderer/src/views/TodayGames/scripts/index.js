export default {
    "武动乾坤": {

        created() {
            this.login();
        },
        methods:{
            login() {
                // this.$web
                // this.$web
                // this.$web
            },
        },










        figure:{
            // data 和 computed 可以重名。 data只负责初始化+响应式。
            data(){
                // 从缓存中获取money值
                return {
                    money:"",
                    state:"idle",// recover running attack  => 使用位运算
                }
            },
            //=== 每个 tick 都会调用,实时计算 ===== begin
            computed: {
                blood() {

                },
                position(){
                    return {
                        x:0,
                        y:0,
                        mapName:''
                    }
                }
            },
            actions:{
                attack:{
                    // 可以被主动调用,
                    doit(point){

                    },
                    // 每个tick会检测一次。用于主动触发和保证 热更新。
                    trigger(){

                    }
                },

            },
            //=== 每个 tick 都会调用,实时计算 ===== end
            watch: {

            },
        },

        task: {
            data:{

            },
            computed:{

            },
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

        map:{
            area: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
        }
    }
}