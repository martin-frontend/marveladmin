import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/lobby_model_product/setting";
import { Message } from "element-ui";
import LobbyModelProductProxy from "../proxy/LobbyModelProductProxy";

interface ILobbyModelProduct extends IEventDispatcher {}

export default class LobbyModelProductMediator extends AbstractMediator {
    private myProxy: LobbyModelProductProxy = <any>this.getProxy(LobbyModelProductProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ILobbyModelProduct = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_lobby_model_product_table_columns,
            EventType.admin_lobby_model_product_index,
            EventType.admin_lobby_model_product_store,
            EventType.admin_lobby_model_product_show,
            EventType.admin_lobby_model_product_update,
            EventType.admin_vendor_show,
            EventType.admin_vendor_index,
            EventType.admin_vendor_product_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: LobbyModelProductProxy = <any>this.facade.retrieveProxy(LobbyModelProductProxy.NAME);
        const myView: ILobbyModelProduct = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_lobby_model_product_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_lobby_model_product_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_lobby_model_product_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_lobby_model_product_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_vendor_show:
                myProxy.setVendor(body);
                break;
            case EventType.admin_vendor_index:
                myProxy.setVendorId(body);
                break;
            case EventType.admin_vendor_product_show:
                myProxy.setVendorProduct(body);
                break;
        }
    }
}
