import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/core/global/GlobalSetting";

export interface IView extends IEventDispatcher {
    showQR(data: any): void;
}
export default class QRcodeMediator extends AbstractMediator {
    protected initViewData() {
        const myView: IView = this.viewComponent;
    }
    listNotificationInterests(): string[] {
        return [EventType.admin_admin_user_google_key];
    }
    handleNotification(notification: puremvc.INotification) {
        const body = notification.getBody();
        const myView: IView = this.viewComponent;
        if (myView) {
            switch (notification.getName()) {
                case EventType.admin_admin_user_google_key:
                    myView.showQR(body);
                    break;
            }
        }
    }
}
