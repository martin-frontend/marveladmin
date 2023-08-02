import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import i18n from "@/lang";
import { EventType, HttpType } from "@/views/lobby_vendor_products/setting";
import { Message } from "element-ui";
import LobbyVendorProductsProxy from "../proxy/LobbyVendorProductsProxy";

interface ILobbyVendorProducts extends IEventDispatcher {}

export default class LobbyVendorProductsMediator extends AbstractMediator {
    private myProxy: LobbyVendorProductsProxy = <any>this.getProxy(LobbyVendorProductsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ILobbyVendorProducts = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_lobby_vendor_products_table_columns,
            EventType.admin_lobby_vendor_products_index,
            EventType.admin_lobby_vendor_products_update,
            EventType.admin_lobby_vendor_products_sync_data,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: LobbyVendorProductsProxy = <any>this.facade.retrieveProxy(LobbyVendorProductsProxy.NAME);
        const myView: ILobbyVendorProducts = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_lobby_vendor_products_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_lobby_vendor_products_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_lobby_vendor_products_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_lobby_vendor_products_sync_data:
                Message.success(<string>LangUtil("操作成功"));
                break;
        }
    }
}
