import axios from "axios";
import { getFileVersion } from "../global/Functions";
import { MD5 } from "../global/MD5";

export default class LangConfig {
    //语言包
    static config: any;

    static load(lang: string) {
        const file_name = MD5.createInstance().hex_md5(`${lang}-2`);
        // @ts-ignore
        const url = process.env.VUE_APP_CDN + `/resource/language_admin/${file_name}.json?` + getFileVersion();
        return axios
            .get(url)
            .then((response: any) => {
                this.config = response.data;
            })
            .catch(() => {
                alert("语言包获取失败");
                window.location.reload();
            });
    }
}
