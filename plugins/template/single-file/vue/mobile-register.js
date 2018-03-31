function template() {

    return {
        parameters: {},
        requestLib: {},
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {} = params;

            context && context.notify(undefined, undefined, {
                formCheck: `
      formCheck() {
        let error = '';
        switch (true) {
          case !this.verifyCode || this.verifyCode !== this.code:
            error = '验证码错误,请重新填写';
            break;
          case !regExp.phoneReg.test(this.phone):
            error = '手机格式错误,请重新填写';
            break;
          case this.phone !== this.verifyPhone:
            error = '获取验证码后,请勿修改手机号码';
            break;
        }
        if (error) {
          this.$toastError(error);
          return false;
        }
        return true;
      },`,
                fetchCode: `
      fetchCode() {
        if (!this.__timer__) {
          if (regExp.phoneReg.test(this.phone)) {

            account.verifyCode(this.phone).then((data) => {
              this.$toast("验证码已发送");
              this.verifyPhone = this.phone;
              this.verifyCode = data.data.authCode;
              (() => {
                let
                  time = 60,
                  handler = () => {
                    this.verifyText = (time--) + '';
                    if (time === 0) {
                      this.verifyText = '获取验证码';
                      clearInterval(this.__timer__);
                      this.__timer__ = undefined;
                    }
                  };
                this.__timer__ = setInterval(handler, 1000);
                handler();
              })();
            }).catch((data) => {
              console.error(data);
              this.$toastError(data.msg || "发生未知错误！")
            });
          } else {
            this.$toast("手机格式错误,请重新填写");
          }
        }

      },`,
                css: `
  .register-page {
    padding: R(30) R(20);
    .avatar {
      display: inline-block;
      width: R(70);
      height: R(70);
      border-radius: 50%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: R(25);
    }
    .page-item {
      background-color: #fff;
      padding: 0 R(20);

      p + p {
        border-top: R(1) solid #f9f9f9;
      }
      p {
        line-height: R(60);
        font-size: R(14);
      }

      input {
        border: none;
        position: relative;
        top: R(-2);
        margin-left: R(20);
        display: inline-block;
        width: R(135);

        &::placeholder {
          color: #ccc;
        }
      }

      .phone {

        span {
          display: inline-block;
          line-height: R(30);
          border-radius: R(2.5);
          font-size: R(12);
          width: R(81);
          text-align: center;
          background-color: #b1b2b3;
          box-shadow: 0 0 R(0.5) #999;
          color: white;
        }
      }
      .verify-code {

      }

      .sex {
        span {
          display: inline-block;
          width: 3em;
          text-align: right;
        }
        .radio {
          display: inline-block;
          input {
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            &:checked {
              & ~ i {
                border: R(1) solid #a7b0b9;
              }
            }
          }
          i {
            padding: 0 R(8);
          }
        }
      }
    }
    .register {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 R(15);
      margin-top: R(40);
      line-height: R(42);
      font-size: R(16);
      &:first-letter {
        margin-right: R(15);
      }
    }
  }`
            });
            return `
            
  <div class="register-page" v-if="userInfo">
    <img class="avatar" :src="userInfo.headimgurl"/>
    <div class="page-item">
      <p class="phone">手机号<input v-model="phone" placeholder="请正确填写手机号"><span @click="fetchCode">{{verifyText}}</span></p>
      <p class="verify-code">验证码<input type="text" v-model="code" placeholder="请输入短信验证码" @keyup.enter="register"></p>
    </div>
    <m-button class="register" @click.native="register">注册</m-button>
  </div>
        `
        }
    }
}