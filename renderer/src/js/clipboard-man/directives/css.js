import keyboard from "../js/keyboard";
const {clipboard, remote} = window.require('electron');
const glob = remote.require("glob").sync;
const {parse} = remote.require("himalaya");

export default {
    validate:/^\$css`([\s\S]+?)`/,
    handle(result){

        let html = parse(result[1]);

        function generateCss(elements = []) {
            // 对象里头的函数代码无法被编译成低版本的JS？
            elements = elements || [];
            return elements.map(item => {
                let attributes = item.attributes || [];
                let css = attributes.find(i => i.key === 'class');
                if (css) {
                    css = css.value;
                }
                return css ? `.${css}{
                            ${generateCss(item.children)}
                        }` : generateCss(item.children)
            }).filter(i => i).join("\r\n")
        }

        // 当生成成功时,去掉$css``
        let cssResult = generateCss(html);
        console.log(cssResult);
        keyboard.output(result[1]);
        clipboard.writeText(cssResult);
    }}