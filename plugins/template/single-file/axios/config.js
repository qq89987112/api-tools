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
import { Notification } from 'element-ui';

if(localStorage.debug){
  // axios.defaults.baseURL = 'http://192.168.1.135:8076/';
  axios.defaults.baseURL = 'http://192.168.1.112:8076';
}

axios.interceptors.request.use(config => {
  return config;
});


axios.interceptors.response.use(res => {
  // 后面是匹配没有遵循code data 格式的
  let data = res.data.data || res.data;
  let message = res.message || res.data.message;

  // 遵循 code data 的需要200才能对，不遵循的直接放过
  if (res.data.status || res.data.code===undefined) {
    return data;
  } else {
    Notification({
      message,
      type: 'error'
    })
    return Promise.reject(data);
  }
}, res => {
  res = res.response;
  // 后面是匹配没有遵循code data 格式的
  let data = res.data.data || res.data;
  let message = res.message || res.data.message;
  Notification({
    message,
    type: 'error'
  })
  return Promise.reject(res.data);
});
            
        `
        }
    }
}