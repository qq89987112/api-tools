let self = {
    get(prefix,key){
        const setting = JSON.parse(localStorage[prefix]||'{}');
        return key ? setting[key] : setting;
    },
    set(prefix,key,value){
        if(key){
            const setting = JSON.parse(localStorage[prefix]||'{}');
            setting[key] = value;
            localStorage[prefix] = JSON.stringify(setting);
        }else{
            localStorage[prefix] = JSON.stringify(value);
        }
    },
    getSetting(key){
        return self.get("setting",key);
    },
    setSetting(key,value){
        self.set("setting",key,value);
    }
};
export default self