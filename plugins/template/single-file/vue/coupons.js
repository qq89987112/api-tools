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
        list: [
          {
            amount: 10,
            status:"use"
          },
          {
            amount: 10,
            status:"used"
          }
        ]`,
                css: `
    .coupons {
      .coupon + .coupon{
        margin-top: r(30);
      }
      .coupon {
        display: flex;
        background-color: #fff;
        align-items: center;
        align-content: center;

        .coupon-value-wrapper{
          position: relative;
          width: r(200);
          height: r(200);
          margin-right: r(30);

          .coupon-value {
            position: relative;
            z-index: 1;
            height: 100%;
            width: 100%;
            text-align: center;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            flex-direction: column;

            .value {
              font-size: 1.4em;
              color: white;
            }
            .sign {
              margin-top: r(20);
              color: #efefef;
              font-size: 0.9em;
            }
          }

          .value-bg{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
          }

        }

        .coupon-info-wrapper{
          position: relative;
          flex: 1;
          .coupon-info {
            display: flex;
            flex-direction: column;
            height: r(200);
            justify-content: space-around;
            .info-title {

            }
            .info-time {
              font-size: 0.9em;
              color: #aaa;
            }
          }
          .use {
            position: absolute;
            right: r(30);
            bottom: r(25);
            color: #20a0ff;
            font-size: 0.9em;
            border: r(1) solid #e4e4e4;
            line-height: 2em;
            padding: 0 r(20);
            border-radius: r(10);
          }
          .used {
            position: absolute;
            bottom: 0;
            right: 0;
            width: r(150);
            height: r(150);
          }
        }
      }
    }`
            });
            return `
            
    <div class="coupons">
      <div class="coupon" v-for="item in list">
        <div class="coupon-value-wrapper">
          <div class="coupon-value">
            <p class="value">￥{{item.amount}}</p>
            <p class="sign">满1000元可用</p>
          </div>
          <img class="value-bg" :src="item.status==='use'?'/static/assets/image/cupon-bg@3x.png':'/static/assets/image/overdue-cupon-bg@3x_27.png'" alt="">
        </div>
        <div class="coupon-info-wrapper">
          <div class="coupon-info">
            <p class="info-title">仅可购买美的指定商品</p>
            <p class="info-time">有效期至2017.03.03</p>
          </div>
          <div class="use" v-if="item.status==='use'">立即使用</div>
          <img class="used" src="/static/assets/image/overdue@3x_75.png" v-else-if="item.status==='used'"/>
        </div>
      </div>
    </div>
        `
        }
    }
}