export default class Utils {
    static JSONParse(string){
        try{
            return JSON.parse(string);
        }catch (e){
            return undefined;
        }
    }
}