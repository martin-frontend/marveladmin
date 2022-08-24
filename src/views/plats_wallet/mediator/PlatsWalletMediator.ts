import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plats_wallet/setting";

interface IPlatsWallet extends IEventDispatcher {

}

export default class PlatsWalletMediator extends AbstractMediator {

    onRegister() {

    }

    protected initViewData() {
        const myView: IPlatsWallet = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_wallet_table_columns,
            EventType.admin_plats_wallet_index,
            EventType.admin_plats_wallet_log_table_columns,
            EventType.admin_plats_wallet_log_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: IPlatsWallet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_wallet_table_columns:
                break;
            case EventType.admin_plats_wallet_index:
                break;
            case EventType.admin_plats_wallet_log_table_columns:
                break;
            case EventType.admin_plats_wallet_log_index:
                break;

        }
    }
}
