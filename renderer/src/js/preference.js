let self = {
    get(prefix,key){
        const setting = JSON.parse(localStorage[prefix]||'{}');
        return setting[key];
    },
    set(prefix,key,value){
        const setting = JSON.parse(localStorage[prefix]||'{}');
        setting[key] = value;
        localStorage[prefix] = JSON.stringify(setting);
    },
    getSetting(key){
        return self.get("setting",key);
    },
    setSetting(key,value){
        self.set("setting",key,value);
    }
};
export default self