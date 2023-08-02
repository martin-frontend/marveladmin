<template>
    <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
        <!-- <el-tooltip class="item" effect="dark" content="Language" placement="top-start">
            <div class="el-icon-set-up" class-name="international-icon" icon-class="language" />

        </el-tooltip> -->
        <span class="lang"> <img :src="getImage" class="img" /> {{ languageText }}</span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="language === 'zh'" command="zh" class="flex">
                <span class="lang"> <img :src="imageBox.zh" class="img" /> 简体中文 </span>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'vi'" command="vi" class="flex">
                <span class="lang"> <img :src="imageBox.vi" class="img" /> Tiếng Việt </span>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'en'" command="en" class="flex">
                <span class="lang"> <img :src="imageBox.en" class="img" /> English </span>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'jp'" command="jp" class="flex">
                <span class="lang"> <img :src="imageBox.jp" class="img" /> Japanese </span>
            </el-dropdown-item>
            <el-dropdown-item :disabled="language === 'ko'" command="ko" class="flex">
                <span class="lang"> <img :src="imageBox.ko" class="img" /> 한국인 </span>
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
                jp: require("../../../../../assets/lang/jp_logo.png"),
                ko: require("../../../../../assets/lang/ko_logo.png"),
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
            } else if (Cookies.get("language") === "jp") {
                str = "Japanese";
            } else if (Cookies.get("language") === "ko") {
                str = "한국인";
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
    align-items: center;
    // padding: 4px 0;
    // background-color: white;
    cursor: pointer;
}
.img {
    width: 31px;
    height: 20px;
    margin-right: 5px;
}
.flex {
    display: flex;
}
</style>
