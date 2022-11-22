import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_permission/setting";

interface IAdminPermission extends IEventDispatcher {
    setTableColumns(value: any): any;
    setTableData(value: any): any;
    setDetail(vlaue: any): any;
}

export default class AdminPermissionMediator extends AbstractMediator {
    onRegister() {
        this.sendNotification(HttpType.admin_admin_permission_table_columns);
        this.sendNotification(HttpType.admin_admin_permission_index);
    }

    protected initViewData() {
        const myView: IAdminPermission = this.viewComponent;
        myView.addEventListener("add", this.onAdd, this);
        myView.addEventListener("edit", this.onEdit, this);
    }

    private onAdd(data: any) {
        data.is_sidebar = data.is_sidebar ? 1 : 0;
        data.is_accessible = data.is_accessible ? 1 : 0;
        data.is_system_menu = data.is_system_menu ? 1 : 0;
        data.is_channel_user = data.is_channel_user ? 1 : 0;
        data.is_agent_user = data.is_agent_user ? 1 : 0;
        data.is_save_log = data.is_save_log ? 1 : 0;
        data.is_coin_user = data.is_coin_user ? 1 : 0;
        data.is_coin_user_exchange = data.is_coin_user_exchange ? 1 : 0;
        this.sendNotification(HttpType.admin_admin_permission_store, data);
    }

    private onEdit(data: any) {
        data.is_sidebar = data.is_sidebar ? 1 : 0;
        data.is_accessible = data.is_accessible ? 1 : 0;
        data.is_system_menu = data.is_system_menu ? 1 : 0;
        data.is_channel_user = data.is_channel_user ? 1 : 0;
        data.is_agent_user = data.is_agent_user ? 1 : 0;
        data.is_save_log = data.is_save_log ? 1 : 0;
        data.is_coin_user = data.is_coin_user ? 1 : 0;
        data.is_coin_user_exchange = data.is_coin_user_exchange ? 1 : 0;
        this.sendNotification(HttpType.admin_admin_permission_update, data);
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_admin_permission_table_columns,
            EventType.admin_admin_permission_index,
            EventType.admin_admin_permission_show,
            EventType.admin_admin_permission_store,
            EventType.admin_admin_permission_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: IAdminPermission = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_permission_table_columns:
                myView.setTableColumns(body);
                break;
            case EventType.admin_admin_permission_index:
                myView.setTableData(body);
                break;
            case EventType.admin_admin_permission_show:
                myView.setDetail(body);
                break;
            case EventType.admin_admin_permission_store:
                this.sendNotification(HttpType.admin_admin_permission_index);
                // this.sendNotification(HttpType.admin_admin_permission_show, {permission_id: body});
                break;
            case EventType.admin_admin_permission_update:
                this.sendNotification(HttpType.admin_admin_permission_index);
                // this.sendNotification(HttpType.admin_admin_permission_show, {permission_id: body});
                break;
        }
    }
}
