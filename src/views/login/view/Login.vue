<template>
    <div class="login-container">
        <el-form
            ref="form"
            :rules="rules"
            :model="loginForm"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>

            <el-form-item prop="username">
                <el-input
                    prefix-icon="el-icon-user"
                    v-model="loginForm.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <el-input
                        prefix-icon="el-icon-lock"
                        v-model="loginForm.password"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        @keyup.enter.native="handleLogin"
                        show-password
                    />
                </el-form-item>
            </el-tooltip>
            <el-form-item prop="google_code" class="mb-0">
                <el-input
                    maxlength="6"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    v-model="loginForm.google_code"
                    :placeholder="$t('login.googleAuthCode')"
                    name="google_code"
                    type="text"
                ></el-input>
            </el-form-item>
            <div class="google_code">
                <div>
                    <p>{{ $t("login.googleAuth") }}</p>
                    <p>Google Authenticator APP</p>
                </div>
                <div>
                    <el-button type="text" @click="getGoogleKey">{{ $t("login.googleKey") }}</el-button>
                </div>
            </div>

            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >Login
            </el-button>
        </el-form>
        <QRCode ref="QRCode"></QRCode>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import AbstractView from "../../../core/abstract/AbstractView";
import LoginMediator from "../mediator/LoginMediator";
import { MD5 } from "@/core/global/MD5";
import { Form } from "element-ui";
import QRCode from "./QRCode.vue";

@Component({
    components: {
        QRCode,
    },
})
export default class Login extends AbstractView {
    private loginForm = {
        username: "",
        password: "",
        google_code: "",
    };
    private rules = {
        username: [{ required: true, message: this.$t("login.accountRequired"), trigger: "blur" }],
        password: [{ required: true, message: this.$t("login.passwordRequired"), trigger: "blur" }],
    };
    private capsTooltip = false;
    private loading = false;
    private redirect = undefined;
    private otherQuery = {};

    constructor() {
        super(LoginMediator);
    }

    @Watch("$route", { immediate: true })
    private watchRoute(route: any) {
        const query = route.query;
        if (query) {
            this.redirect = query.redirect;
            this.otherQuery = this.getOtherQuery(query);
        }
    }

    private checkCapslock(e: any) {
        const { key } = e;
        this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    }
    private handleLogin() {
        this.loading = true;
        this.dispatchEvent("login", {
            username: this.loginForm.username,
            password: MD5.createInstance().hex_md5(this.loginForm.password),
            google_code: this.loginForm.google_code,
        });
    }
    private getOtherQuery(query: any) {
        return Object.keys(query).reduce((acc: any, cur) => {
            if (cur !== "redirect") {
                acc[cur] = query[cur];
            }
            return acc;
        }, {});
    }

    public loginSuccess() {
        this.$router.push({ path: this.redirect || "/layout/dashboard", query: this.otherQuery });
        this.loading = false;
    }

    public loginFailed() {
        this.loading = false;
    }

    private getGoogleKey() {
        (this.$refs["form"] as Form & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.dispatchEvent("getGoogleKey", {
                    username: this.loginForm.username,
                    password: MD5.createInstance().hex_md5(this.loginForm.password),
                });
            }
        });
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        height: 47px;
        input {
            height: 47px;
            background: transparent;
            border: 0px;
            color: $light_gray;
            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }

    ::v-deep .mb-0 {
        margin-bottom: 0;
    }

    .google_code {
        display: flex;
        justify-content: space-between;
        color: #abb4bf;
        font-size: 14px;
        margin-bottom: 22px;
        p {
            margin: 8px 0;
        }
        ::v-deep span {
            color: #abb4bf;
            text-decoration: underline;
        }
    }
}
</style>
