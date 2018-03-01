import axios from "axios"
import jQuery from "jquery"

const { remote } = window.require('electron');
let jquery = remote.require("jquery");
let JSDOM = remote.require("jsdom").JSDOM;

/*
* 服务端渲染，但是，会造成 回调函数 的内存泄露问题
* 解决：
*   类似 map 的回调函数,用 for...i 循坏解决,或者 [].concat($.get()), $.get() 的不能直接使用,因为这个array的map方法存在于remote端。
* */
export default function serverSideJquery (url) {
    return axios.get(url).then(data=>{
        const dom = new JSDOM(data.data);
        // 这个可以直接用 $("a")
        return jquery(dom.window);
    })
}

// 这个连 $.html() 都出不来内容。
// export default function (url) {
//     return axios.get(url).then(data=>{
//         // 这个不可以直接用 $("a"),需要$.find("a")
//         return jQuery(data.data);
//     })
// }