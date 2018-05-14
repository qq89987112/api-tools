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
            <template>
  <div class="login-page">
    <Dialog v-model="show" :closeable="false">
      <div class="login-box">
        <p class="title">登录</p>
        <form class="login-fields" @submit.stop="onSubmit">
          <div class="field-box">
            <span class="field">帐号</span>
            <input class="input" v-model="params.user"/>
          </div>
          <div class="field-box">
            <span class="field">密码</span>
            <input class="input" type="password" v-model="params.password"/>
          </div>
          <p class="buttons"><button type="submit" class="login-button button ripple-button">登录</button></p>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script>
  import Dialog from "../component/dialog"
  export default {
    name: 'login',
    components: {Dialog},
    data() {
      return {
        show: true,
        params:{
        }
      }
    },
    methods: {
      onSubmit(){
        console.log(this.params);
      }
    },
    created() {
    }
  }
</script>

<style lang="scss">

  .login-page {
    .login-box {
      width: 400px;

      .title {
        font-size: 1.2em;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 15px;
      }
      .login-fields {
        .field-box + .field-box {
          border-top: 1px solid #efefef;
        }
        .field-box {
          padding: 0 30px;
          line-height: 3.5em;
          background-color: #fff;
          display: flex;
          align-items: center;
          align-content: center;
          .field {
            color: #333;
            margin-right: 30px;
            text-align: right;
          }
          // value 可以用 readonly
          .input {
            flex: 1;
            color: #666;
          }
        }
        .buttons{
          text-align: center;
          .login-button {
            background-color: #20a0ff;
          }
        }
      }
    }
  }
</style>
        `
        }
    }
}