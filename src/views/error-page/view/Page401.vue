<template>
    <div class="errPage-container">
        <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
            {{ LangUtil("返回") }}
        </el-button>
        <el-row>
            <el-col :span="12">
                <h1 class="text-jumbo text-ginormous">
                    Oops!
                </h1>
                {{ LangUtil("gif来源") }}<a href="https://zh.airbnb.com/" target="_blank">airbnb</a>
                {{ LangUtil("页面") }}
                <h2>{{ LangUtil("你没有权限去该页面") }}</h2>
                <h6>{{ LangUtil("如有不满请联系你领导") }}</h6>
                <ul class="list-unstyled">
                    <li>{{ LangUtil("或者你可以去") }}:</li>
                    <li class="link-type">
                        <router-link to="/dashboard">
                            {{ LangUtil("回首页") }}
                        </router-link>
                    </li>
                    <li class="link-type">
                        <a href="https://www.taobao.com/">{{ LangUtil("随便看看") }}</a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="dialogVisible = true">{{ LangUtil("点我看图") }}</a>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12">
                <img src="@/assets/401_images/401.gif" width="313" height="428" alt="Girl has dropped her ice cream." />
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" :title="LangUtil('随便看看')">
            <img :src="ewizardClap" class="pan-img" />
        </el-dialog>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import { Vue } from "vue-property-decorator";

export default class Page401 extends Vue {
    LangUtil = LangUtil;
    ewizardClap = "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646";
    dialogVisible = false;

    back() {
        if (this.$route.query.noGoBack) {
            this.$router.push({ path: "/" });
        } else {
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
.errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
        background: #008489;
        color: #fff;
        border: none !important;
    }
    .pan-gif {
        margin: 0 auto;
        display: block;
    }
    .pan-img {
        display: block;
        margin: 0 auto;
        width: 100%;
    }
    .text-jumbo {
        font-size: 60px;
        font-weight: 700;
        color: #484848;
    }
    .list-unstyled {
        font-size: 14px;
        li {
            padding-bottom: 5px;
        }
        a {
            color: #008489;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
}
</style>
