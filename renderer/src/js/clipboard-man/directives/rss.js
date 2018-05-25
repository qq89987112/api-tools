import keyboard from "../js/keyboard";
import utils from "../js/utils";
import rssParser from "rss-parser";
const {clipboard, remote} = window.require('electron');

/**
 * test
 *      
 *      $rss`
 *          大豆 种植面积
 *          玉米 种植面积
 *      `
 * 
 *      $rss =>  1. '大豆 种植面积':
 *                      1. 大豆种植....
 *                             摘要......
 *                      2. ...
 *                  
 *               2. '玉米 种植面积'
 * 
 *      $rss.1 => '大豆 种植面积'
 * 
 *      
 * 
 * 
 */

const instance = new rssParser();
const parseString = instance.parseString.bind(instance);

export default {
    validate:/(?:^\$rss`([\s\S]+?)`)|(?:^\$rss[^`\n]*)/,
    handle(result){
        let 
            keywords = result[1],
            existKeywords = JSON.parse(localStorage.$rssKeywords||"[]");

        if(keywords){
            existKeywords = existKeywords.concat(keywords.split("\n").map(i=>i.trim()));
            existKeywords = existKeywords.filter((i,idx)=>i&&(existKeywords.findIndex(i2=>i2===i)===idx));
            localStorage.$rssKeywords =  JSON.stringify(existKeywords);
            keyboard.output("添加成功!");
        }else{
            let [name,params={}] = utils.parseLineToObject(result[0]);
            let index = params.modifier;
            if(index!==undefined){

            }else{
                if(!existKeywords.length){
                    keyboard.output(`请添加关键字! $rss\`
                        keywords
                    \``);
                    return;
                }
                let promise = Promise.all(existKeywords.map(i=>fetch(`http://news.baidu.com/ns?word=${i}&tn=newsrss&sr=0&cl=2&rn=20&ct=0`) .then(res=>res.blob())
                .then(blob => {
                    return new Promise((resolve,reject)=>{
                        var reader = new FileReader();
                        reader.onload = function(e) {
                          resolve(parseString(reader.result))
                        }
                        reader.onerror = reject;
                        reader.readAsText(blob, 'GBK') 
                    })
                    
                })));
                promise.then(data=>{
                    keyboard.output(data.map((i,idx)=>`
${idx+1}. ${i.title}
    ${i.items.slice(0,5).map((i2,idx2)=>`
    ${idx2+1}. ${i2.title}    ${i2.link}
    ${i2.content}`).join("\n")}`).join("\n")+"\n")
                })
            }
        }
  
    
    }}