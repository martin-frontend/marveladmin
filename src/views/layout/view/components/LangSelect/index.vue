<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <!-- <el-tooltip class="item" effect="dark" content="Language" placement="top-start">
            <div class="el-icon-set-up" class-name="international-icon" icon-class="language" />
           
        </el-tooltip> -->
        <span class="lang"> <img :src="getImage" class="img" /> {{ languageText }}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language === 'zh'" command="zh" class="flex">
                <img :src="imageBox.zh" class="img" />
                <a>简体中文</a>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'vi'" command="vi" class="flex">
                <img :src="imageBox.vi" class="img" />
                <a>Tiếng Việt</a>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'en'" command="en" class="flex">
                <img :src="imageBox.en" class="img" />
                <a>English</a>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import Cookies from "js-cookie";
export default {
    data() {
        return {
            imageBox: {
                zh: require("../../../../../assets/lang/china_logo.png"),
                vi: require("../../../../../assets/lang/vi_logo.png"),
                en: require("../../../../../assets/lang/en_logo.png"),
            },
        };
    },
    computed: {
        language() {
            return Cookies.get("language") || "zh";
        },
        getImage() {
            return this.imageBox[this.language];
        },
        languageText() {
            let str = "简体中文";
            if (Cookies.get("language") === "vi") {
                str = "Tiếng Việt";
            } else if (Cookies.get("language") === "en") {
                str = "English";
            }
            return str;
        },
    },
    methods: {
        handleSetLanguage(lang) {
            Cookies.set("language", lang);
            window.location.reload();
        },
    },
};
</script>
<style lang="scss">
.lang {
    font-size: 16px;
    user-select: none;
    display: flex;

    .img {
        margin-top: 13px;
    }
}
.img {
    width: 31px;
    height: 20px;
    margin-top: 5px;
    margin-right: 5px;
}
.flex {
    display: flex;
}
</style>
