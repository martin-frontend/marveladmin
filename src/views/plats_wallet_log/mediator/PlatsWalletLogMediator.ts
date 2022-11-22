import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plats_wallet_log/setting";
import PlatsWalletLogProxy from "../proxy/PlatsWalletLogProxy";

interface IPlatsWalletLog extends IEventDispatcher {}

export default class PlatsWalletLogMediator extends AbstractMediator {
    private myProxy: PlatsWalletLogProxy = <any>this.getProxy(PlatsWalletLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatsWalletLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plats_wallet_log_table_columns, EventType.admin_plats_wallet_log_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatsWalletLogProxy = <any>this.facade.retrieveProxy(PlatsWalletLogProxy.NAME);
        const myView: IPlatsWalletLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_wallet_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_wallet_log_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
