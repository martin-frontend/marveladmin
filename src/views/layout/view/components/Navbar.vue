<template>
    <div class="navbar">
        <hamburger
            id="hamburger-container"
            :active="sidebar.opened == 1"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
        <BasicOperation />
        <div class="right-menu">
            <template v-if="device !== 'mobile'">
                <lang-select class="right-menu-item hover-effect" />

                <search id="header-search" class="right-menu-item" />

                <div v-if="isShowMessageCount()" class="right-menu-item hover-effect" style="margin-top:5px">
                    <el-badge :value="userInfo.message_amount" :max="99" :hidden="userInfo.message_amount == 0">
                        <i class="el-icon-bell" @click="goMessagePage" />
                    </el-badge>
                </div>

                <div class="right-menu-item hover-effect">
                    <div class="el-icon-question" @click="goHelpPage" />
                </div>

                <screenfull id="screenfull" class="right-menu-item hover-effect" />
            </template>

            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
                    <div>
                        <span>{{ cate_options[userInfo.cate] + "-" + type_options[userInfo.type] }}</span>

                        <span>{{ userInfo.admin_username }}</span>
                    </div>

                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import LangUtil from "@/core/global/LangUtil";
import Breadcrumb from "@/views/layout/view/components/Breadcrumb";
import Hamburger from "@/views/layout/view/components/Hamburger";
import Screenfull from "@/views/layout/view/components/Screenfull";
import Search from "@/views/layout/view/components/HeaderSearch";
import GlobalVar from "@/core/global/GlobalVar";
import Http from "@/core/net/Http";
import GlobalEventType from "@/core/global/GlobalEventType";
import { checkUnique, unique } from "@/core/global/Permission";

import BasicOperation from "./BasicOperation/view/index.vue";

import LangSelect from "@/views/layout/view/components/LangSelect";
import i18n from "@/lang";
export default {
    components: {
        Breadcrumb,
        Hamburger,
        Screenfull,
        Search,
        LangSelect,
        BasicOperation,
    },
    props: {
        sidebar: {
            type: Object,
            default: null,
        },
        device: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            cate_options: { 1: LangUtil("系统"), 2: LangUtil("平台") },
            type_options: {
                1: LangUtil("超级管理员"),
                2: LangUtil("管理员"),
                4: LangUtil("普通用户"),
                8: LangUtil("渠道用户"),
                32: LangUtil("币商代收"),
                64: LangUtil("币商代付"),
            },
        };
    },
    computed: {
        userInfo: function() {
            const selfModel = window.puremvc.Facade.getInstance().retrieveProxy("SelfModel");
            return selfModel.userInfo;
        },
    },
    methods: {
        toggleSideBar() {
            console.log("this.sidebar :>> ", this.sidebar);
            this.$emit("handleToggleSideBar");
        },
        async logout() {
            window.localStorage.clear();
            this.$router.push(`/login`);
            location.reload();
            // await this.$store.dispatch("user/logout");
            // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },
        isShowMessageCount() {
            return checkUnique(unique.index_message);
            // return (
            //     checkUnique(unique.exchange_orders) ||
            //     checkUnique(unique.coin_receive_recharge_order) ||
            //     checkUnique(unique.plat_message)
            // );
        },
        goMessagePage() {
            // this.$router.push("/layout/index_message");
            const selfModel = window.puremvc.Facade.getInstance().retrieveProxy("SelfModel");
            window.puremvc.Facade.getInstance().sendNotification(
                GlobalEventType.SHOW_MESSAGE_PANEL,
                selfModel.userInfo.message_info
            );
        },
        goHelpPage() {
            const ajax = new XMLHttpRequest();
            ajax.open("GET", "config.json?" + Math.random());
            ajax.send();
            ajax.onreadystatechange = function(e) {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        const result = JSON.parse(this.response);
                        window.open(result.help_url, "_blank");
                    }
                }
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;
        margin-left: auto;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                display: flex;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                > div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    font-size: 16px;
                    margin-left: 6px;
                    span {
                        line-height: 1;
                    }
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
