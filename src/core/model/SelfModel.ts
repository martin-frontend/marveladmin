import { UserInfoVO } from "@/core/vo/UserInfoVO";
import GlobalEventType from "@/core/global/GlobalEventType";
import GlobalVar from "@/core/global/GlobalVar";
import { HttpType } from "../global/GlobalSetting";
import { layoutRouteSetting } from "../global/LayoutRouteSetting";
import { getQueryVariable } from "../global/Functions";
import { checkUnique, permissions_unique, unique } from "../global/Permission";
import layoutRouter from "@/router/layoutRouter";
import router from "@/router";
import { UserType } from "../enum/UserType";

export default class SelfModel extends puremvc.Proxy {
    static NAME = "SelfModel";
    constructor() {
        super(SelfModel.NAME);
    }

    onRegister() {
        const userInfo = window.localStorage.getItem("userInfo");
        if (userInfo) {
            Object.assign(this._userInfo, JSON.parse(userInfo));

            GlobalVar.admin_user_id = this._userInfo.admin_user_id;
            GlobalVar.token = this._userInfo.token;

            this.sendNotification(HttpType.admin_admin_user_mine, { modules: "[1, 3, 4]" });
        }
    }
    /**用户信息 */
    private _userInfo: UserInfoVO = {
        admin_user_id: 0,
        admin_username: "",
        rel_name: "",
        avatar: "",
        type: 0,
        cate: 0,
        status: 0,
        phone: "",
        token: "",
        user_plats: {},
        vendor_ids: {},

        coin_user_gold: "",
        coin_user: {},
        sidebar: [],
        permission: [],
        permissions_unique: [],

        message_amount: 0,
        message_info: {
            "1": 0,
            "2": 0,
            "3": 0,
        },
    };
    /**消息数量轮询计时器 */
    public messageTimer!: number;

    public get userInfo(): UserInfoVO {
        return this._userInfo;
    }

    /**是否为币商 */
    public get isCoinUser() {
        return this._userInfo.type == UserType.COIN || this._userInfo.type == UserType.COINUSEREXCHANGE;
    }

    public setUserInfo(value: UserInfoVO) {
        Object.assign(this._userInfo, value);
        window.localStorage.setItem("userInfo", JSON.stringify(this._userInfo));
        GlobalVar.admin_user_id = this._userInfo.admin_user_id;
        GlobalVar.token = this._userInfo.token;
        this.sendNotification(GlobalEventType.UPDATE_USERINFO);
        this.sendNotification(HttpType.admin_admin_user_mine, { modules: "[1, 3, 4]" });
    }

    public setMineInfo(value: any) {
        Object.assign(this._userInfo, value);
        permissions_unique.push(...this._userInfo.permissions_unique);
        // @ts-ignore
        const compiletype = process.env.VUE_APP_ENV;
        const menu = getQueryVariable("menu");
        if (compiletype != "production" && menu == "local") {
            // 使用本地配置的菜单/路由
            router.addRoutes([layoutRouter]);
        } else {
            // 使用服务器配置的菜单/路由
            // 更新路由
            this.updateRouter(value.sidebar);
            const arr: any = [];
            for (const item of layoutRouter.children) {
                //@ts-ignore
                if (item["bUser"]) {
                    arr.push(item);
                }
            }
            arr.push({
                path: "404",
                name: "404",
                component: () => import(/* webpackChunkName: "404" */ "@/views/error-page/view/Page404.vue"),
            });
            arr.push({
                path: "*",
                redirect: "/layout/404",
                name: "notFound",
            });
            layoutRouter.children = arr;
            // 添加菜单的路由
            router.addRoutes([layoutRouter]);
            router.addRoutes([
                {
                    path: "*",
                    redirect: "/404",
                    name: "notFound",
                },
            ]);
            // 左侧菜单
            for (const item of value.sidebar) {
                if (item.path) {
                    item.path = "/layout/" + item.path;
                } else {
                    item.path = "/layout";
                }
            }
            layoutRouteSetting.length = 0;
            //@ts-ignore
            layoutRouteSetting.push(...value.sidebar);
        }
        if (
            checkUnique(unique.exchange_orders) ||
            checkUnique(unique.coin_receive_recharge_order) ||
            checkUnique(unique.plat_message)
        ) {
            this.messageTimer = setInterval(() => {
                this.sendNotification(HttpType.admin_index_message_show, { hideLoading: true });
            }, 30000);
            this.sendNotification(HttpType.admin_index_message_show, { hideLoading: true });
        }

        // 不同类型的用户前往不同的页面
        if (router.currentRoute.path == "/" || router.currentRoute.path == "/layout") {
            if (this.userInfo.type == UserType.COIN) {
                router.replace("/layout/vip_recharge");
            } else if (this.userInfo.type == UserType.CHANNEL) {
                console.log("渠道用户");
            } else {
                if (checkUnique(unique.dashboard)) router.replace("/layout/dashboard");
            }
        }
    }
    // 更新菜单名，以服务端发过来的为准
    private updateRouter(silderBar: any[]) {
        for (const item of silderBar) {
            for (const router of layoutRouter.children) {
                if (router.path == item.path) {
                    router.name = item.meta.title;
                    //@ts-ignore
                    router["bUser"] = true;
                    break;
                }
            }

            if (item.children && item.children.length > 0) {
                this.updateRouter(item.children);
            }
        }
    }
    /**
     * 更新消息信息
     * @param data
     */
    public setMessageInfo(data: any) {
        const oldMessageInfo = Object.assign({}, this.userInfo.message_info);
        Object.assign(this.userInfo.message_info, data);
        const keys = Object.keys(data);
        const last_message_amount = this.userInfo.message_amount;
        this.userInfo.message_amount = 0;
        for (const key of keys) {
            this.userInfo.message_amount += data[key];
        }

        if (this.userInfo.message_amount > last_message_amount) {
            this.sendNotification(GlobalEventType.SHOW_MESSAGE_PANEL, this.userInfo.message_info);
            if (GlobalVar.play_video) {
                let audioDiv: any;
                let time = 0;
                if (
                    this.userInfo.message_info["1"] > oldMessageInfo["1"] &&
                    localStorage.getItem("sound1") != "false"
                ) {
                    audioDiv = document.getElementById("withdrawAudio");
                    if (audioDiv) audioDiv.play();
                    time += 2000;
                }
                if (
                    this.userInfo.message_info["2"] > oldMessageInfo["2"] &&
                    localStorage.getItem("sound2") != "false"
                ) {
                    setTimeout(() => {
                        audioDiv = document.getElementById("orderAudio");
                        if (audioDiv) audioDiv.play();
                    }, time);
                }
            }
        }
    }
}
