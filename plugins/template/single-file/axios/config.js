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