export default {
    /**
     *
     * @param line
     * @return [objectName,object]
     * table?column=姓名，年龄，性别，职业&operation=删除.confirm
     * 其中 object 格式为
     *         {
     *               modifier:'file',
     *               fields:['姓名','年龄','性别','职业'],
     *               operation:[{
     *                   value:'删除',
     *                   modifier:'confirm'
     *               },"更新"],
     *               rest:[],
     *               其他命令
     *               $notify:{
     *
     *               }
     *           }
     *  除了command的名字外，都在object中。
     */
    parseLineToObject(line) {
        let
            templateNameReg = /(?:(\S+)\?)|(?:(.+))/,
            templateNameStr = templateNameReg.exec(line);
        templateNameStr = templateNameStr.filter(i => i);
        let
            [name, modifier] = templateNameStr[1].split("."),
            tempParams,
            params = JSON.parse(JSON.stringify({modifier, rest: []}));

        line = line.replace(templateNameStr[0], "");
        tempParams = line.split("&");

        // 获取参数
        tempParams.reduce((prev, cur) => {
            cur = cur.split("=");
            let [name, value] = cur;
            let originValue = value;
            if (!value) {
                value = name;
                name = undefined;
            }

            //将 a,b,c 变为数组
            value = value.split(/[,，]/).map(i => {
                // 获取参数的修饰器
                const [name, modifier] = i.split(".")
                return modifier ? {
                    name,
                    modifier
                } : name
            });

            if (value.length <= 1) {
                value = value[0];
            }

            if (!originValue) {
                prev.rest = prev.rest.concat(value);
            } else {
                let [tempName, modifier] = name.split(".");
                prev[tempName] = modifier ? {modifier, value} : value;
            }
            return prev
        }, params);

        return [name, params];
    }
}