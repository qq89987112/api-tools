import axios from "axios"

const { remote } = window.require('electron');
// 不能这样 import jquery from "jquery"
let jquery = remote.require("jquery");
let JSDOM = remote.require("jsdom").JSDOM;

export default function (url) {
    return axios.get(url).then(data=>{
        const dom = new JSDOM(data.data);
        return jquery(dom.window);
    })
}