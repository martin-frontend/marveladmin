import Vue from "vue";
import "normalize.css/normalize.css";
import Element from "element-ui";
import "./styles/element-variables.scss";
import "@/styles/index.scss";
import "nprogress/nprogress.css";
import App from "./App.vue";
import AppFacade from "@/core/AppFacade";
import { generateUUID, getQueryVariable } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import VueRouter from "vue-router";
import router from "@/router";
import layoutRouter from "@/router/layoutRouter";
import LogUtil from "./core/global/LogUtil";
import i18n from "@/lang";
import LangConfig from "./core/config/LangConfig";

LogUtil.init();

Vue.use(Element, {
    size: "medium", // set element-ui default size
});
Vue.use(VueRouter);
Vue.config.productionTip = false;
// @ts-ignore
Element.Dialog.props.closeOnClickModal.default = false;

// 获取host
// @ts-ignore
GlobalVar.host = process.env.VUE_APP_BASE_API;
// 获取唯一码（设备码）
let device = window.localStorage.getItem("device");
if (!device) {
    device = generateUUID();
    window.localStorage.setItem("device", device);
}
GlobalVar.device = device;
LangConfig.load(GlobalVar.lang).then(() => {
    AppFacade.inst.startUp();

    new Vue({
        router,
        i18n,
        render: h => h(App),
    }).$mount("#app");

    //临时
    // if(qa != "2") router.addRoutes([layoutRouter]);

    // 如果没有登录，直接进入登录页
    if (!GlobalVar.token) {
        router.push("/login");
    }
});

window.onerror = function(message, source, lineno, colno, error) {
    if (
        message != "" &&
        message != "ResizeObserver loop limit exceeded" &&
        message != "ResizeObserver loop completed with undelivered notifications."
    )
        alert(message);
    return false;
};
window.addEventListener("unhandledrejection", (e: any) => {
    if (e.reason && e.reason.stack && e.reason.stack != "") {
        alert(e.reason.stack);
    }
});

document.onclick = function() {
    GlobalVar.play_video = true;
    // document.onclick = null;
};
