import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plats_wallet/setting";
import PlatsWalletProxy from "../proxy/PlatsWalletProxy";
import { SuccessMessage } from "@/core/global/Constant";
import { Message } from "element-ui";

interface IPlatsWallet extends IEventDispatcher {

}

export default class PlatsWalletMediator extends AbstractMediator {
    private myProxy: PlatsWalletProxy = <any>this.getProxy(PlatsWalletProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatsWallet = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_wallet_table_columns,
            EventType.admin_plats_wallet_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatsWalletProxy = <any>this.facade.retrieveProxy(PlatsWalletProxy.NAME);
        const myView: IPlatsWallet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_wallet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_wallet_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
