import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_whitelist_index/setting";
import { Message } from "element-ui";
import AdminWhitelistIndexProxy from "../proxy/AdminWhitelistIndexProxy";

interface IAdminWhitelistIndex extends IEventDispatcher {
    
}

export default class AdminWhitelistIndexMediator extends AbstractMediator {
    private myProxy: AdminWhitelistIndexProxy = <any>this.getProxy(AdminWhitelistIndexProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IAdminWhitelistIndex = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_admin_whitelist_table_columns,
            EventType.admin_admin_whitelist_index,
            EventType.admin_admin_whitelist_store,
            EventType.admin_admin_whitelist_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: AdminWhitelistIndexProxy = <any>this.facade.retrieveProxy(AdminWhitelistIndexProxy.NAME);
        const myView: IAdminWhitelistIndex = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_whitelist_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_admin_whitelist_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_admin_whitelist_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_admin_whitelist_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
