export default class LangConfig {
    //语言包
    static config: any;

    static load(lang: string) {
        let name = "";
        switch (lang) {
            case "zh_CN":
                name = "zh-CN";
                break;
            case "vi_VN":
                name = "vi-VN";
                break;
            case "en_EN":
                name = "en-US";
                break;
            case "jp_JP":
                name = "ja-JP";
                break;
        }
        try {
            this.config = require(`@/assets/json/lang/${name}.json`);
        } catch (e) {
            this.config = {};
        }
    }
}
