//<template name='名字' name-type='string' phone='手机' phone-type='string'>
//    asdfsad
//    dsafsadf
//</template>
export default class Template {
    static load(file) {
        return new Template(file)
    }

    constructor(file) {
        this.file = file;
    }
}