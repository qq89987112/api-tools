//<template name='名字' name-type='string' phone='手机' phone-type='string'>
//    asdfsad
//    dsafsadf
//</template>
import {parseString} from "xml2js"

export default class Template {
    static load(file) {
        return new Promise((resolve,reject)=>{
            let fr = new FileReader();
            fr.readAsText(file);
            fr.onload = () =>{
                let result = fr.result;
                parseString(result,(err,obj)=>{
                    err ?reject(err):resolve(new Template(obj));
                })
            }
            fr.onerror = err=>{
                reject(err);
            }
        })
    }

    constructor(template={}) {
        this.xmlTemplate = template.template;
    }

    getParameter(){
        return this.xmlTemplate.$;
    }


}