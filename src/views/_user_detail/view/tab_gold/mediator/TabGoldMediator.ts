import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabGoldProxy from "../proxy/TabGoldProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";

export default class TabGoldMediator extends AbstractMediator {
    private myProxy: TabGoldProxy = <any>getProxy(TabGoldProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_users_gold_log_table_columns, EventType.admin_plat_users_gold_log_index];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_users_gold_log_table_columns:
                    this.myProxy.setTableColumns(body);
                    this.myProxy.onQuery();
                    break;
                case EventType.admin_plat_users_gold_log_index:
                    this.myProxy.setTableData(body);
                    break;
            }
        }
    }
}
