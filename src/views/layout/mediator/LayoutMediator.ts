import AbstractMediator from "@/core/abstract/AbstractMediator";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";

export interface ILayout extends IEventDispatcher {
    showLoading(): void;
    hideLoading(): void;
}
export default class LayoutMediator extends AbstractMediator {
    onRegister() {}

    protected initViewData() {}

    listNotificationInterests(): string[] {
        return [
            GlobalEventType.SHOW_WAITING,
            GlobalEventType.HIDE_WAITING,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: ILayout = <any>this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case GlobalEventType.SHOW_WAITING:
                myView.showLoading();
                break;
            case GlobalEventType.HIDE_WAITING:
                myView.hideLoading();
                break;
        }
    }

}
