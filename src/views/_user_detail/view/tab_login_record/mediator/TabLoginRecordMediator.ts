import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabLoginRecordProxy from "../proxy/TabLoginRecordProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";

export default class TabLoginRecordMediator extends AbstractMediator {
    private myProxy: TabLoginRecordProxy = <any>getProxy(TabLoginRecordProxy);
    // private pageSetting;

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_user_login_record_table_columns, EventType.admin_plat_user_login_record_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_login_record_table_columns:
                this.myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_login_record_index:
                this.myProxy.setTableData(body);
                break;
        }
    }
}
