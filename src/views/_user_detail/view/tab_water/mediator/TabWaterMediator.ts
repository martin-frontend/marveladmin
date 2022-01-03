import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabWaterProxy from "../proxy/TabWaterProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";

export default class TabWaterMediator extends AbstractMediator {
    private myProxy: TabWaterProxy = <any>getProxy(TabWaterProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_statistic_user_days_table_columns, EventType.admin_statistic_user_days_index];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_statistic_user_days_table_columns:
                    this.myProxy.setTableColumns(body);
                    this.myProxy.onQuery();
                    break;
                case EventType.admin_statistic_user_days_index:
                    this.myProxy.setTableData(body);
                    break;
            }
        }
    }
}
