import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_user_log/setting";
import { Message } from "element-ui";
import AdminUserLogProxy from "../proxy/AdminUserLogProxy";

interface IAdminUserLog extends IEventDispatcher {
    
}

export default class AdminUserLogMediator extends AbstractMediator {
    private myProxy: AdminUserLogProxy = <any>this.getProxy(AdminUserLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IAdminUserLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_admin_user_log_table_columns,
            EventType.admin_admin_user_log_index,
            EventType.admin_admin_user_log_show,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: AdminUserLogProxy = <any>this.facade.retrieveProxy(AdminUserLogProxy.NAME);
        const myView: IAdminUserLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_user_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_admin_user_log_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_admin_user_log_show:
                myProxy.setDetail(body);
                break;
        }
    }
}
