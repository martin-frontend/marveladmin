import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/core/global/GlobalSetting";
import GlobalVar from "@/core/global/GlobalVar";
import SelfModel from "@/core/model/SelfModel";
import GlobalEventType from "@/core/global/GlobalEventType";
import router from "@/router";

export interface ILogin extends IEventDispatcher {
    loginSuccess(): void;
    loginFailed(): void;
}
export default class LoginMediator extends AbstractMediator {
    private selfModel!: SelfModel;

    onRegister() {
        this.selfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
    }

    protected initViewData() {
        const myView: ILogin = this.viewComponent;
        myView.addEventListener("login", this.onLogin, this);
        myView.addEventListener("getGoogleKey", this.getGoogleKey, this);
    }

    private onLogin(data: any) {
        this.sendNotification(HttpType.admin_admin_user_login, data);
    }

    private getGoogleKey(data: any) {
        this.sendNotification(HttpType.admin_admin_user_google_key, data);
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_admin_user_login, EventType.admin_admin_user_mine, GlobalEventType.REQUEST_END];
    }

    handleNotification(notification: puremvc.INotification) {
        const body = notification.getBody();
        const myView: ILogin = this.viewComponent;
        if (myView) {
            switch (notification.getName()) {
                case EventType.admin_admin_user_login:
                    GlobalVar.token = body.token;
                    GlobalVar.admin_user_id = body.admin_user_id;
                    window.localStorage.setItem("token", GlobalVar.token);
                    window.localStorage.setItem("admin_user_id", GlobalVar.admin_user_id.toString());

                    this.selfModel.setUserInfo(body);

                    break;
                case EventType.admin_admin_user_mine:
                    // if (this.selfModel.userInfo.type > 4) {
                    router.replace("/layout");
                    // } else {
                    // router.replace("/layout/dashboard");
                    // }
                    break;
                case GlobalEventType.REQUEST_END:
                    myView.loginFailed();
                    break;
            }
        }
    }
}
