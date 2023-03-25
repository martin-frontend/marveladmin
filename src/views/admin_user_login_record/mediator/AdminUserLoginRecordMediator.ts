import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_user_login_record/setting";
import { Message } from "element-ui";
import AdminUserLoginRecordProxy from "../proxy/AdminUserLoginRecordProxy";

interface IAdminUserLoginRecord extends IEventDispatcher {}

export default class AdminUserLoginRecordMediator extends AbstractMediator {
    private myProxy: AdminUserLoginRecordProxy = <any>this.getProxy(AdminUserLoginRecordProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IAdminUserLoginRecord = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_admin_user_login_record_table_columns, EventType.admin_admin_user_login_record_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: AdminUserLoginRecordProxy = <any>this.facade.retrieveProxy(AdminUserLoginRecordProxy.NAME);
        const myView: IAdminUserLoginRecord = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_user_login_record_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_admin_user_login_record_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
