const child_process = require("child_process");
const path = require("path");
const prefix = `python ${path.join(__dirname,"../damo/cli.py")}`;
const glob = require("glob").sync;
let config = {
    path:""
}
let dm = {
        // setting
        // path 相关的用法无作用,因为,一条指令运行完后 dm 就释放了。
        setPath(path){
            // return child_process.execSync(`${prefix} setPath ${path}`).toString().trim();
            return config.path = path;
        },
        getPath(){
            return child_process.execSync(`${prefix} getPath`).toString().trim();
        },

        // pic and color
        capture(x1, y1, x2, y2, file) {
            return child_process.execSync(`${prefix} capture ${x1} ${y1} ${x2} ${y2} ${file}`).toString().trim();
        },
        captureGif(x1, y1, x2, y2, file, delay, time) {
            return child_process.execSync(`${prefix} captureGif ${x1} ${y1} ${x2} ${y2} ${file} ${delay} ${time}`).toString().trim();
        },
        captureJpg(x1, y1, x2, y2, file, quality) {
            return child_process.execSync(`${prefix} captureJpg ${x1} ${y1} ${x2} ${y2} ${file} ${quality}`).toString().trim();
        },
        capturePng(x1, y1, x2, y2, file) {
            return child_process.execSync(`${prefix} capturePng ${x1} ${y1} ${x2} ${y2} ${file}`).toString().trim();
        },
        capturePre(file) {
            return child_process.execSync(`${prefix} capturePre ${file}`).toString().trim();
        },
        enableDisplayDebug(enable_debug) {
            return child_process.execSync(`${prefix} enableDisplayDebug ${enable_debug}`).toString().trim();
        },
        enableGetColorByCapture(enable) {
            return child_process.execSync(`${prefix} enableGetColorByCapture ${enable}`).toString().trim();
        },
        cmpColor(x, y, color, sim) {
            return child_process.execSync(`${prefix} cmpColor ${x} ${y} ${color} ${sim}`).toString().trim();
        },
        findPicEx(x1, y1, x2, y2, pic_name, delta_color, sim, dir) {
            return child_process.execSync(`${prefix} findPicEx ${x1} ${y1} ${x2} ${y2} ${pic_name} ${delta_color} ${sim} ${dir}`).toString().trim();
        },
        findColorEx(x1, y1, x2, y2, color, sim, dir) {
            return child_process.execSync(`${prefix} findColorEx ${x1} ${y1} ${x2} ${y2} ${color} ${sim} ${dir}`).toString().trim();
        },
        findMultiColorEx(x1, y1, x2, y2, first_color, offset_color, sim, dir) {
            return child_process.execSync(`${prefix} findMultiColorEx ${x1} ${y1} ${x2} ${y2} ${first_color} ${offset_color} ${sim} ${dir}`).toString().trim();
        },
        getAveHSV(x1, y1, x2, y2) {
            return child_process.execSync(`${prefix} getAveHSV ${x1} ${y1} ${x2} ${y2}`).toString().trim();
        },
        getAveRGB(x1, y1, x2, y2) {
            return child_process.execSync(`${prefix} getAveRGB ${x1} ${y1} ${x2} ${y2}`).toString().trim();
        },
        getColorNum(x1, y1, x2, y2, color, sim) {
            return child_process.execSync(`${prefix} getColorNum ${x1} ${y1} ${x2} ${y2} ${color} ${sim}`).toString().trim();
        },
        getColor(x, y) {
            return child_process.execSync(`${prefix} getColor ${x} ${y}`).toString().trim();
        },
        getColorBGR(x, y) {
            return child_process.execSync(`${prefix} getColorBGR ${x} ${y}`).toString().trim();
        },
        getColorHSV(x, y) {
            return child_process.execSync(`${prefix} getColorHSV ${x} ${y}`).toString().trim();
        },
        isDisplayDead(x1, y1, x2, y2, t) {
            return child_process.execSync(`${prefix} isDisplayDead ${x1} ${y1} ${x2} ${y2} ${t}`).toString().trim();
        },
        imageToBmp(pic_name, bmp_name) {
            return child_process.execSync(`${prefix} imageToBmp ${pic_name} ${bmp_name}`).toString().trim();
        },
        matchPicName(pic_name) {
            return child_process.execSync(`${prefix} matchPicName ${pic_name}`).toString().trim();
        },
        RGB2BGR(rgb_color) {
            return child_process.execSync(`${prefix} RGB2BGR ${rgb_color}`).toString().trim();
        },
        getPicSize(pic_name) {
            return child_process.execSync(`${prefix} getPicSize ${pic_name}`).toString().trim();
        },
        setPicPwd(pwd) {
            return child_process.execSync(`${prefix} setPicPwd ${pwd}`).toString().trim();
        },
        // str


        addDict(index, dict_info) {
            return child_process.execSync(`${prefix} addDict ${index} ${dict_info}`).toString().trim();
        },
        clearDict(index) {
            return child_process.execSync(`${prefix} clearDict ${index}`).toString().trim();
        },
        fetchWord(x1, y1, x2, y2, color, word) {
            return child_process.execSync(`${prefix} fetchWord ${x1} ${y1} ${x2} ${y2} ${color} ${word}`).toString().trim();
        },
        findStrFastEx(x1, y1, x2, y2, string, color_format, sim) {
            return child_process.execSync(`${prefix} findStrFastEx ${x1} ${y1} ${x2} ${y2} ${string} ${color_format} ${sim}`).toString().trim();
        },
        findStrWithFontEx(x1, y1, x2, y2, string, color_format, sim, font_name, font_size, flag) {
            return child_process.execSync(`${prefix} FindStrWithFontEx ${x1} ${y1} ${x2} ${y2} ${string} ${color_format} ${sim} ${font_name} ${font_size} ${flag}`).toString().trim();
        },
        ocrEx(x1, y1, x2, y2, color_format, sim) {
            return child_process.execSync(`${prefix} OcrEx ${x1} ${y1} ${x2} ${y2} ${color_format} ${sim}`).toString().trim();
        },
        setColGapNoDict(col_gap) {
            return child_process.execSync(`${prefix} SetColGapNoDict ${col_gap}`).toString().trim();
        },
        setDict(index, file) {
            return child_process.execSync(`${prefix} SetDict ${index} ${file}`).toString().trim();
        },
        setDictPwd(pwd) {
            return child_process.execSync(`${prefix} setDictPwd ${pwd}`).toString().trim();
        },
        setExactOcr(exact_ocr) {
            return child_process.execSync(`${prefix} setExactOcr ${exact_ocr}`).toString().trim();
        },
        setMinColGap(min_col_gap) {
            return child_process.execSync(`${prefix} setMinColGap ${min_col_gap}`).toString().trim();
        },
        setMinRowGap(min_row_gap) {
            return child_process.execSync(`${prefix} setMinRowGap ${min_row_gap}`).toString().trim();
        },
        setRowGapNoDict(row_gap) {
            return child_process.execSync(`${prefix} setRowGapNoDict ${row_gap}`).toString().trim();
        },
        setWordGap(word_gap) {
            return child_process.execSync(`${prefix} setWordGap ${word_gap}`).toString().trim();
        },
        setWordGapNoDict(word_gap) {
            return child_process.execSync(`${prefix} setWordGapNoDict ${word_gap}`).toString().trim();
        },
        setWordLineHeight(line_height) {
            return child_process.execSync(`${prefix} setWordLineHeight ${line_height}`).toString().trim();
        },
        setWordLineHeightNoDict(line_height) {
            return child_process.execSync(`${prefix} setWordLineHeightNoDict ${line_height}`).toString().trim();
        },
        useDict(index) {
            return child_process.execSync(`${prefix} useDict ${index}`).toString().trim();
        },

// keyboard


        getCursorPos(x, y) {
            return child_process.execSync(`${prefix} getCursorPos ${x} ${y}`).toString().trim();
        },
        getKeyState(vk_code) {
            return child_process.execSync(`${prefix} getKeyState ${vk_code}`).toString().trim();
        },
        keyDown(vk_code) {
            return child_process.execSync(`${prefix} keyDown ${vk_code}`).toString().trim();
        },
        keyDownChar(key_str) {
            return child_process.execSync(`${prefix} keyDownChar ${key_str}`).toString().trim();
        },
        keyPress(vk_code) {
            return child_process.execSync(`${prefix} keyPress ${vk_code}`).toString().trim();
        },
        keyPressChar(key_str) {
            return child_process.execSync(`${prefix} keyPressChar ${key_str}`).toString().trim();
        },
        keyUp(vk_code) {
            return child_process.execSync(`${prefix} keyUp ${vk_code}`).toString().trim();
        },
        keyUpChar(key_str) {
            return child_process.execSync(`${prefix} keyUpChar ${key_str}`).toString().trim();
        },
        leftClick() {
            return child_process.execSync(`${prefix} leftClick `).toString().trim();
        },
        leftDoubleClick() {
            return child_process.execSync(`${prefix} leftDoubleClick `).toString().trim();
        },
        leftDown() {
            return child_process.execSync(`${prefix} leftDown `).toString().trim();
        },
        leftUp() {
            return child_process.execSync(`${prefix} leftUp `).toString().trim();
        },
        middleClick() {
            return child_process.execSync(`${prefix} middleClick `).toString().trim();
        },
        moveR(rx, ry) {
            return child_process.execSync(`${prefix} moveR ${rx} ${ry}`).toString().trim();
        },
        moveTo(x, y) {
            return child_process.execSync(`${prefix} moveTo ${x} ${y}`).toString().trim();
        },
        moveToEx(x, y, w, h) {
            return child_process.execSync(`${prefix} moveToEx ${x} ${y} ${w} ${h}`).toString().trim();
        },
        rightClick() {
            return child_process.execSync(`${prefix} rightClick `).toString().trim();
        },
        rightDown() {
            return child_process.execSync(`${prefix} rightDown `).toString().trim();
        },
        rightUp() {
            return child_process.execSync(`${prefix} rightUp `).toString().trim();
        },
        setKeypadDelay(type, delay) {
            return child_process.execSync(`${prefix} setKeypadDelay ${type} ${delay}`).toString().trim();
        },
        setMouseDelay(type, delay) {
            return child_process.execSync(`${prefix} setMouseDelay ${type} ${delay}`).toString().trim();
        },
        waitKey(vk_code, time_out) {
            return child_process.execSync(`${prefix} waitKey ${vk_code} ${time_out}`).toString().trim();
        },
        wheelDown() {
            return child_process.execSync(`${prefix} wheelDown `).toString().trim();
        },
        wheelUp() {
            return child_process.execSync(`${prefix} wheelUp `).toString().trim();
        },
        // Window

        enumWindow(parent, title, classname, filterf) {
            return child_process.execSync(`${prefix} enumWindow ${parent} ${title} ${classname} ${filterf}`).toString().trim();
        },
        findWindow(classname, title) {
            return child_process.execSync(`${prefix} findWindow ${classname} ${title}`).toString().trim();
        },
        findWindowForeground() {
            return child_process.execSync(`${prefix} getForegroundWindow `).toString().trim();
        },
        bind(hwnd, display, mouse, keypad, mode) {
            return child_process.execSync(`${prefix} bindWindow ${hwnd} ${display} ${mouse} ${keypad} ${mode}`).toString().trim();
        },
        unbind() {
            return child_process.execSync(`${prefix} unBindWindow `).toString().trim();
        },
        getBindWindow() {
            return child_process.execSync(`${prefix} getBindWindow `).toString().trim();
        },
        sendString(hwnd, sendStr) {
            return child_process.execSync(`${prefix} sendString ${hwnd} ${sendStr}`).toString().trim();
        },
    }
;
dm.setPath("d:/test");

function getFilePath(fileName) {
    if (config.path) {
        let address = `${config.path}/${fileName}`;
        let addr = glob(address);
        return addr[0];
    } else {
        return fileName;
    }
}

module.exports.dm = dm;

module.exports.dmWrapper = Object.assign({},dm,{
        getPicSize(bitmap){
            return dm.getPicSize(getFilePath(bitmap));
        },
        findPicEx(bitmap){
            return dm.findPicEx(0, 0, 2000, 2000, getFilePath(bitmap), "020202", 0.8, 0);
        },
    click(x,y){
            dm.moveTo(x,y);
            dm.leftClick();

        },
        clickPic(bitmap,{center=true,offsetX = 0,offsetY = 0}={}){
            //    0,0,0
            let [name,fileOffsetX=0,fileOffsetY=0] = getFilePath(bitmap).split("/").slice(-1)[0].split("-");

            let ret = this.findPicEx(bitmap);
            let [,x,y] = ret.split(",");
            if (center) {
                let [picW,picH] = this.getPicSize(bitmap).split(",");
                x = +x;
                y = +y;
                x += parseInt((+picW)/2);
                y += parseInt((+picH)/2);
            }
            if (x && y) {
                dm.moveTo(x+(parseInt(fileOffsetX)||offsetX),y+(parseInt(fileOffsetY)||offsetY));
                dm.leftClick();
                return true;
            }
            return false;
        },
        sendString(text){
            child_process.execSync(`wscript ${path.join(__dirname,"../damo/sendString.vbs")} ${text}`);
        }
    }
)