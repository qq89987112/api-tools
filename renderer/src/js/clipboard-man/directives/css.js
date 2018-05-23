import keyboard from "../js/keyboard";
const {clipboard, remote} = window.require('electron');
const glob = remote.require("glob").sync;
const {parse,stringify} = remote.require("himalaya");
const scssfmt = remote.require('scssfmt')

/**
 * test
 * 
 *  $css`
 *      <div style="margin-right:10px;" class="a" >
 *          <div class="b" style="background:red;"></div>
 *          <div class="c">
 *      </div>
 *  `
 * 
 * 
 */
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
                let style = attributes.find(i => i.key === 'style');
                if (css) {
                    css = css.value;
                }
                if (style) {
                    style = style.value;
                }
                return css ? `.${css}{${style?`
                            ${style}
                            `:''}${generateCss(item.children)}
                        }` : generateCss(item.children)
            }).filter(i => i).join("\r\n")
        }

        // 当生成成功时,去掉$css`` style=""
        let cssResult = generateCss(html);
        console.log(cssResult);
        keyboard.output(result[1].replace(/style=["'].+?["'] ?/g,""));
        clipboard.writeText(scssfmt(cssResult));
    }}