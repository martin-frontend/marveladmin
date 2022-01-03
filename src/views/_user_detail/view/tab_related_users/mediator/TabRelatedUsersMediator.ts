import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabRelatedUsersProxy from "../proxy/TabRelatedUsersProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";

export default class TabRelatedUsersMediator extends AbstractMediator {
    private myProxy: TabRelatedUsersProxy = <any>getProxy(TabRelatedUsersProxy);
    // private pageSetting;

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_user_table_columns, EventType.admin_plat_user_related_users];
    }

    handleNotification(notification: puremvc.INotification) {
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_table_columns:
                this.myProxy.setTableColumns(body);
                this.myProxy.getRelatedUsers();
                break;
            case EventType.admin_plat_user_related_users:
                this.myProxy.setTableData(body);
                break;
        }
    }
}
