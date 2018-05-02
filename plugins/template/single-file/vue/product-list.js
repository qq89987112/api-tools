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
      ]`,
                css: `
      .product-list {
        .product-item {
          border-top: r(1) solid #f0f0f0;
          display: flex;
          align-items: center;
          align-content: center;
          background-color: #fff;
          padding: r(20);
          height: r(180);
          .product-image {
            width: r(180);
            height: r(180);
            background-color: orange;
            margin-right: r(20);
            vertical-align: middle;
          }
          .product-info-box {
            display: flex;
            flex-direction: column;
            height: 100%;
            flex: 1;
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
      }`
            });
            return `
            
        <div class="product-list">
          <div class="product-item" v-for="(product,idx) in products" :key="idx">
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
        `
        }
    }
}