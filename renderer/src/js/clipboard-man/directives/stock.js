import keyboard from "../js/keyboard";

export default {
    validate:/^\$stock\.(.+)/,
    handle(result){
        let code = result[1];
        fetch(`http://hq.sinajs.cn/list=${code}`).then(r => r.text()).then(v => {
            let responseReg = /="(.+)"/;
            result = responseReg.exec(v);
            if (result) {
                result = result[1];
                result = result.split(",");
                // 0：豆粕连续，名字
                // 1：145958，不明数字（难道是数据提供商代码？）
                // 2：3170，开盘价
                // 3：3190，最高价
                // 4：3145，最低价
                // 5：3178，昨日收盘价 （2013年6月27日）
                // 6：3153，买价，即“买一”报价
                // 7：3154，卖价，即“卖一”报价
                // 8：3154，最新价，即收盘价
                // 9：3162，结算价
                // 10：3169，昨结算
                // 11：1325，买 量
                // 12：223，卖 量
                // 13：1371608，持仓量
                // 14：1611074，成交量
                // 15：连，大连商品交易所简称
                // 16：豆粕，品种名简称
                // 17：2013-06-28，日期
                keyboard.output(result[8]);
            } else {
                keyboard.output(`找不到正确的接口返回：${v}`.trim());
            }
        })
    }
}