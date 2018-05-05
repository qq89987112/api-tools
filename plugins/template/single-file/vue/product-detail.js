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
    components: {Popup},
    data() {
      return {
        tab: 1,
        skuPopup:false,
        radio:0,
        imageList: [
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ]
      }
    },`,
                css: `
  .product-page {
    display: flex;
    flex-direction: column;

    .content {
      flex: 1;
      overflow-y: auto;

      swiper {
        height: r(350);
        .slide-image {
          width: 100%;
          height: r(350);
        }
      }
      .product-info {
        background-color: #fff;
        padding: 0 r(30);
        .product-title {
          line-height: 3em;
          font-size: 1.2em;
        }
        .product-price {
          .current-price {
            font-size: 1.2em;
            color: #ee5544;
            margin-right: r(30);
          }
          .past-price {
            color: #bbb;
            text-decoration: line-through;
          }
          .sold{
            float: right;
            color: #aaa;
          }
        }
        .services {
          display: flex;
          line-height: 3em;
          margin-top: r(30);

          .service {
            flex: 1;
            text-align: center;
            .iconfont{
              margin-right: r(10);
              color: #aaa;
              &.active{
                color: #20a0ff;
              }
            }
          }
        }
      }
      .promotion {
        display: flex;
        padding: 0 r(30);
        background-color: #fff;
        margin-top: r(30);
        line-height: 3em;
        .coupon-value {
          flex: 1;
          text-align: right;
          color: #ee5544;
        }
      }
      .store-info-box {
        display: flex;
        margin-top: r(30);
        padding: r(30);
        background-color: #fff;
        align-items: center;
        align-content: center;
        line-height: 1.8em;

        .store-image {
          width: r(100);
          height: r(100);
          background-color: #f0f0f0;
          margin-right: r(30);
        }
        .store-info {
          flex: 1;
          .store-title {

          }
          .store-sign {

          }
        }
        .store-product-info {
          text-align: right;
          .product-count {

          }
          .product-all {

          }
        }
      }
      .actions {
        display: flex;
        background-color: #fff;
        border-top: r(1) solid #f0f0f0;

        .action + .action {
          border-left: r(1) solid #f0f0f0;
        }
        .action {
          padding: r(20) 0;
          flex: 1;
          text-align: center;
        }
      }
      .tabs {
        display: flex;
        background-color: #fff;
        margin-top: r(30);
        .tab {
          flex: 1;
          text-align: center;
          padding: r(20) 0;
          &.active {
            color: #ee5544;
            position: relative;
            &:after {
              content: '';
              display: inline;
              position: absolute;
              bottom: r(6);
              height: r(2);
              left: r(10);
              right: r(10);
              background-color: #ee5544;
            }
          }
        }
      }
      .tab-contents {
        .tab-content {

        }
        .tab-content {
          background-color: #fff;
          border-top: r(1) solid #efefef;
          .spec-box {
            border: r(1) solid #efefef;
            border-top: none;
            width: 80%;
            margin: 0 auto;

            .info-row {
              border-bottom: r(1) solid #efefef;
              border-top: r(1) solid #efefef;
              .key {
                padding: r(20);
                display: inline-block;
                text-align: center;
                border-right: r(1) solid #efefef;
              }
              .value {
                padding: 0 r(20);
              }
            }
            .title {
              padding: r(20);
            }
          }

          .after-sale {
            width: 80%;
            margin: 0 auto;
            padding: r(10) 0;
            .after-sale-title {

            }
            .after-sale-value {
              margin-top: r(10);
              color: #aaa;
            }
          }
        }

      }
      .recommand {
        margin-top: r(30);
        background-color: #fff;

        .title {
          line-height: 3em;
          text-align: center;
          font-size: 1.1em;
          font-weight: bold;
        }
        .product {
          padding: 0 r(30);
          .product-image {
            width: r(230);
            height: r(230);
            background-color: #f0f0f0;
          }
          .product-title {

          }
          .product-sku {

          }
          .product-price {

          }
        }
      }
    }
    .bottom-bar {
      line-height: 3em;
      display: flex;
      background-color: #fff;
      box-shadow: 0 0 r(30) #aaa;

      .iconfont + .iconfont{
        border-left: r(1) solid #f0f0f0;
      }
      .iconfont {
        width: 3em;
        text-align: center;
        font-size: 1.2em;

        &.icon-dianpu {

        }
        &.icon-wodeshoucang {

        }
        &.icon-gouwuche {

        }
      }
      .join-cart {
        flex: 1;
        text-align: center;
        color: #ee5544;
        border-left: r(1) solid #f0f0f0;
      }
      .buy-now {
        @extend .join-cart;
        color: white;
        background-color: #ee5544;
      }
    }

    .sku-select-popup{
      background-color: #fff;
      height: 40vh;
      display: flex;
      flex-direction: column;

      .content{
        flex: 1;
        padding-bottom: r(100);
        .product-info-box{
          display: flex;

          .product-image{
            width: r(200);
            height: r(200);
            background-color: #f0f0f0;
            margin-top: r(-50);
          }
          .product-info{
            flex: 1;
            display: flex;
            flex-direction: column;

            .product-title{
                flex: 1;
            }
            .product-price{
              color: #ee5544;
            }
          }
        }
        .panel-title{
          line-height: 3em;
          font-size: 1.1em;
        }
        .radios{
          .radio + .radio{
            margin-left: r(30);
          }
          .radio{
            border: r(1) solid #e7e7e7;
            border-radius: r(8);
            line-height: 2em;
            padding: 0 r(20);
            display: inline-block;

            &.active{
              border-color:currentColor;
              color: #ee5544;
            }
          }
        }
      }
      .bottom-button{
        line-height: 3em;
        background-color: #ee5544;
        color: white;
        text-align: center;
      }
    }

  }`
            });
            return `
            
  <div class="product-page">
    <div class="content">
      <swiper :autoplay="true" :circular="true" :indicator-dots="true">
        <swiper-item v-for="(image,idx) in imageList" :key="idx">
          <img :src="image" class="slide-image"/>
        </swiper-item>
      </swiper>
      <div class="product-info">
        <div class="product-title">定频空调</div>
        <p class="product-price">
          <span class="current-price">￥1000</span>
          <span class="past-price">￥10008</span>
          <span class="sold">已售10000件</span>
        </p>
        <p class="services">
          <span class="service"><span class="iconfont icon-checkbox"/>上门安装</span>
          <span class="service"><span class="iconfont icon-checkbox active"/>免运费</span>
          <span class="service"><span class="iconfont icon-checkbox active"/>七天退货</span>
        </p>
      </div>
      <div class="promotion">促销 <p class="coupon-value">满1000减50、满2000减100、满10000减1000</p></div>
      <div class="store-info-box">
        <img class="store-image" src="" alt="">
        <div class="store-info">
          <p class="store-title">美的自营旗舰店</p>
          <p class="store-sign">原来的生活可以更美的</p>
        </div>
        <div class="store-product-info">
          <p class="product-count">100</p>
          <p class="product-all">全部商品</p>
        </div>
      </div>
      <div class="actions">
        <div class="action">联系卖家</div>
        <div class="action">进店逛逛</div>
      </div>

      <div class="tabs">
        <div class="tab" @click="tab=0" :class="tab===0&&'active'">图文详情</div>
        <div class="tab" @click="tab=1" :class="tab===1&&'active'">规格参数</div>
        <div class="tab" @click="tab=2" :class="tab===2&&'active'">包装售后</div>
      </div>
      <div class="tab-contents">
        <div class="tab-content" v-show="tab===0">图文详情</div>
        <div class="tab-content" v-show="tab===1">
          <div class="spec-box">
            <p class="info-row">
              <span class="key">商品编号</span>
              <span class="value">123</span>
            </p>
            <p class="title">规格</p>
            <p class="info-row">
              <span class="key">商品编号</span>
              <span class="value">123</span>
            </p>
          </div>
        </div>
        <div class="tab-content" v-show="tab===2">
          <div class="after-sale">
            <p class="after-sale-title">包装清单</p>
            <p class="after-sale-value">室内机*1 室外机*1</p>
          </div>
        </div>
      </div>
      <div class="recommand">
        <p class="title">为你推荐</p>
        <div class="product">
          <img class="product-image" src="" alt="">
          <p class="product-title">美的省电星</p>
          <p class="product-sku">KF-23GW/Y</p>
          <p class="product-price">￥1000</p>
        </div>
      </div>
    </div>
    <div class="bottom-bar">
      <span class="iconfont icon-dianpu"/>
      <span class="iconfont icon-wodeshoucang"/>
      <span class="iconfont icon-gouwuche"/>
      <span class="join-cart">加入购物车</span>
      <span class="buy-now" @click="skuPopup=true">立即购买</span>
    </div>


    <popup v-model="skuPopup">
      <div class="sku-select-popup">
        <div class="content">
          <div class="product-info-box">
            <img class="product-image" src="" alt="">
            <div class="product-info">
              <p class="product-title">美的 省电星</p>
              <p class="product-price">￥10,000</p>
            </div>
          </div>
          <p class="panel-title">颜色</p>
          <div class="radios">
            <div class="radio">经典拉丝</div>
            <div class="radio">智能精控</div>
          </div>
          <p class="panel-title">容量</p>
          <p class="radios">
            <span class="radio" :class="radio===0&&'active'" @click="radio=0">10L</span>
            <span class="radio" :class="radio===1&&'active'" @click="radio=1">12L</span>
          </p>
        </div>
        <div class="bottom-button">选好了</div>
      </div>
    </popup>
  </div>
        `
        }
    }
}