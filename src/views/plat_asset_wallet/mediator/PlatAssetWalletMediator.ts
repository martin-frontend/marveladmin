import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_asset_wallet/setting";
import { Message } from "element-ui";
import PlatAssetWalletProxy from "../proxy/PlatAssetWalletProxy";

interface IPlatAssetWallet extends IEventDispatcher {}

export default class PlatAssetWalletMediator extends AbstractMediator {
    private myProxy: PlatAssetWalletProxy = <any>this.getProxy(PlatAssetWalletProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAssetWallet = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_asset_wallet_table_columns, EventType.admin_plat_asset_wallet_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAssetWalletProxy = <any>this.facade.retrieveProxy(PlatAssetWalletProxy.NAME);
        const myView: IPlatAssetWallet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_asset_wallet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_asset_wallet_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
