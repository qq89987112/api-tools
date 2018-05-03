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
        imageList:[
          'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
          'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ]`,
                css: `
    swiper{
      height: r(350);
      .slide-image{
        width: 100%;
        height: r(350);
      }
    }`
            });
            return `
            
    <swiper :autoplay="true" :circular="true" :indicator-dots="true">
      <swiper-item v-for="(image,idx) in imageList" :key="idx">
        <image :src="image" class="slide-image"/>
      </swiper-item>
    </swiper>
        `
        }
    }
}