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

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.request.use(config=>{
  return config;
});


axios.interceptors.response.use(res=>{
  let data = res.data.data||res.data;
  if(res.data.code===200){
    return data;
  }else{
    return Promise.reject(data);
  }
},res=>{
  return Promise.reject(res.response.data);
});
        `
        }
    }
}