import Vue from "vue";
import Cookies from "js-cookie";
import VueI18n from "vue-i18n";
import locale from 'element-ui/lib/locale'

// element-ui built-in lang
import elementViLocale from "element-ui/lib/locale/lang/vi";
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN";

// User defined lang
import viLocale from "./vi";
import zhLocale from "./zh";
import GlobalVar from "@/core/global/GlobalVar";

Vue.use(VueI18n);

const getLanguage = () => Cookies.get("language");

const messages = {
    vi: {
        ...viLocale,
        ...elementViLocale,
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale,
    },
    // 这里如果有其它语言包继续按照规则添加即可
};

export const getLocale = () => {
    const language = getLanguage() || navigator.language.toLowerCase();
    Cookies.set("language", language);
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            switch(locale){
                case "zh":
                    GlobalVar.lang = "zh_CN";
                    break;
                case "vi":
                    GlobalVar.lang = "vi_VN";
                    break;
            }
            return locale;
        }
    }

    // Default language is english
    GlobalVar.lang = "zh_CN";
    return "zh";
};

const i18n = new VueI18n({
    locale: getLocale(),
    messages,
});
locale.i18n((key:any, value:any) => i18n.t(key, value))

export default i18n;
