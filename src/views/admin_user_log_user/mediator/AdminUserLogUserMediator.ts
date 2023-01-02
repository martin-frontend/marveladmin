import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_user_log_user/setting";
import { Message } from "element-ui";
import AdminUserLogUserProxy from "../proxy/AdminUserLogUserProxy";

interface IAdminUserLogUser extends IEventDispatcher {
    
}

export default class AdminUserLogUserMediator extends AbstractMediator {
    private myProxy: AdminUserLogUserProxy = <any>this.getProxy(AdminUserLogUserProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IAdminUserLogUser = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_admin_user_log_user_table_columns,
            EventType.admin_admin_user_log_user_index,
            EventType.admin_admin_user_log_user_show,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: AdminUserLogUserProxy = <any>this.facade.retrieveProxy(AdminUserLogUserProxy.NAME);
        const myView: IAdminUserLogUser = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_user_log_user_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_admin_user_log_user_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_admin_user_log_user_show:
                myProxy.setDetail(body);
                break;
        }
    }
}
