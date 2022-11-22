import AbstractMediator from "./core/abstract/AbstractMediator";
import GlobalEventType from "./core/global/GlobalEventType";
import { IEventDispatcher } from "./core/IEventDispatcher";

export interface IApp extends IEventDispatcher {
    showMessagePanel(data: any): void;
}
export default class AppMediator extends AbstractMediator {
    listNotificationInterests(): string[] {
        return [GlobalEventType.SHOW_MESSAGE_PANEL];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: IApp = <any>this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case GlobalEventType.SHOW_MESSAGE_PANEL:
                myView.showMessagePanel(body);
                break;
        }
    }
}
