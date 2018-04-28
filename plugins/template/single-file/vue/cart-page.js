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
                data: `
    data() {
      return {
        selectAll: false,
        list: [{
          name: "美的热水器",
          products: [
            {
              name: "万和ST28智能恒温强排湿燃气热水器",
              sku: "经典拉丝",
              $checked: false
            },
            {
              name: "万和ST28智能恒温强排湿燃气热水器2",
              sku: "经典拉丝2",
              $checked: false
            },
          ]

        }, {
          name: "美的热水器",
          products: [
            {
              name: "万和ST28智能恒温强排湿燃气热水器",
              sku: "经典拉丝",
              $checked: false
            },
            {
              name: "万和ST28智能恒温强排湿燃气热水器2",
              sku: "经典拉丝2",
              $checked: false
            },
          ]

        }]
      }
    },`,
                css: `
  .cart-page {
    display: flex;
    flex-direction: column;

    .store-list {
      flex: 1;
      overflow-y: auto;
      .store-list-item {
        .store-name-box {
          line-height: 3em;
          display: flex;
          background-color: #fff;
          padding: 0 r(30);
          // 全局color #555
          .icon-dianpu {
            margin-right: r(20);
            font-size: 0.9em;
          }
          .store-name {
            flex: 1;
          }
          .edit {

          }
        }
        .product-list {
          .product-item {
            border-top: r(1) solid #f0f0f0;
            display: flex;
            align-items: center;
            align-content: center;
            background-color: #fff;
            padding: r(20) r(30);
            height: r(180);
            .product-image {
              width: r(180);
              height: r(180);
              background-color: orange;
              margin: 0 r(20);
              vertical-align: middle;
            }
            .product-info-box {
              display: flex;
              flex-direction: column;
              height: 100%;
              .product-title {

              }
              .product-sku-box {
                flex: 1;
                margin-top: r(10);
                color: #999;

                .product-sku {
                  display: flex;
                  align-content: center;
                  align-items: center;
                  .iconfont {
                    font-size: 0.6em;
                    color: #999;
                    margin-left: r(10);
                  }
                }

              }

              .price-box {
                display: flex;
                .price {
                  flex: 1;
                }
                .num {

                }
              }
            }
          }
        }
      }
    }
    .menus {
      background-color: #fff;
      padding-left: r(30);
      line-height: 3em;
      border-top: r(1) solid #f0f0f0;
      display: flex;
      align-items: center;
      align-content: center;
      .price-all {
        flex: 1;
        line-height: 1;
        text-align: right;
        margin-right: r(30);
        .total {
          .price{
            color: #ee5544;
          }
        }
        .discounts {
          color: #999;
          font-size: 0.9em;
          margin-top: r(10);
        }
      }
      .check-out {
        background-color: #ee5544;
        color: white;
        text-align: center;
        padding: 0 r(30);
      }
    }

  }`
            });
            return `
            
  <div class="cart-page">
    <div class="store-list">
      <div class="store-list-item" v-for="(store,idx1) in list">
        <div class="store-name-box">
          <i class="iconfont icon-dianpu"/>
          <span class="store-name">{{store.name}}</span>
          <span class="edit">编辑</span>
        </div>
        <div class="product-list">
          <div class="product-item" v-for="(product,idx2) in store.products">
            <mcheckbox :key="idx2" v-model="product.$checked"></mcheckbox>
            <img class="product-image" src="" alt="">
            <div class="product-info-box">
              <p class="product-title">{{product.name}}</p>
              <div class="product-sku-box">
                <p class="product-sku">{{product.sku}}<i class="iconfont icon-down"></i></p>
              </div>
              <p class="price-box">
                <span class="price">￥1,000</span>
                <span class="num">x1</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menus">
      <mcheckbox v-model="selectAll">全选</mcheckbox>
      <div class="price-all">
        <p class="total">合计：<span class="price">￥10,2333</span></p>
        <p class="discounts">已优惠：￥10</p>
      </div>
      <div class="check-out">结算(1)</div>
    </div>
  </div>
        `
        }
    }
}