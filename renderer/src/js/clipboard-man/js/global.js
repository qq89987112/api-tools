export default new Proxy(JSON.parse(localStorage.globalVar||"{}"),{
    // get(target, key, receiver) {
    //     return Reflect.get(target, key, receiver);
    // },
    set(target, key,value, receiver){
        let result = Reflect.set(target, key, value, receiver);
        localStorage.globalVar = JSON.stringify(receiver);
        return result;
    }
});