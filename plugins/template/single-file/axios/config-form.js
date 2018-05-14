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
            import axios from "axios"
import qs from "qs"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config=>{
  config.data = qs.stringify(config.data);
  return config;
});


axios.interceptors.response.use(res=>{
  if(res.data.code===200){
    return res.data.data;
  }else{
    return Promise.reject(res.data);
  }
});
        `
        }
    }
}