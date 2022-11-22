import LangConfig from "../config/LangConfig";
// import { MD5 } from "./MD5";
import md5 from "js-md5";

export default function LangUtil(str: string, ...args: any[]) {
    if (str) {
        let result: string = str;
        if (LangConfig.config) {
            // const md5str = md5.createInstance().hex_md5(str);
            const md5str = md5(str);
            result = LangConfig.config[md5str] || str;
        }
        for (let i = 0; i < args.length; i++) {
            result = result.replace(`{${i}}`, args[i]);
        }
        return result;
    }
    return "";
}
