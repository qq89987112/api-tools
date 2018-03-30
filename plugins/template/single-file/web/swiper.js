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

            context && context.notify(undefined, undefined, undefined);
            return `
            
    <div class="swiper-box">
      <div class="swiper-items">
        <div class="swiper-item">
          <img src="image/index/swiper-item.png" alt="">
          <h1>1</h1>
        </div>
        <div class="swiper-item">
          <img src="image/index/swiper-item.png" alt="">
          <h1>2</h1>
        </div>
        <div class="swiper-item">
          <img src="image/index/swiper-item.png" alt="">
          <h1>3</h1>
        </div>
      </div>
      <div class="swiper-dots">
        <div class="swiper-dot"></div>
        <div class="swiper-dot"></div>
        <div class="swiper-dot"></div>
      </div>
    </div>
        `
        }
    }
}