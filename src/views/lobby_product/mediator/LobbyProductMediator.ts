import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/lobby_product/setting";
import { Message } from "element-ui";
import LobbyProductProxy from "../proxy/LobbyProductProxy";

interface ILobbyProduct extends IEventDispatcher {
    
}

export default class LobbyProductMediator extends AbstractMediator {
    private myProxy: LobbyProductProxy = <any>this.getProxy(LobbyProductProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ILobbyProduct = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_lobby_product_table_columns,
            EventType.admin_lobby_product_index,
            EventType.admin_lobby_product_store,
            EventType.admin_lobby_product_show,
            EventType.admin_lobby_product_update,
            EventType.admin_lobby_model_product_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: LobbyProductProxy = <any>this.facade.retrieveProxy(LobbyProductProxy.NAME);
        const myView: ILobbyProduct = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_lobby_product_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_lobby_product_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_lobby_product_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_lobby_product_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_lobby_product_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_lobby_model_product_index:
                myProxy.setProductList(body);
                break;

        }
    }
}
