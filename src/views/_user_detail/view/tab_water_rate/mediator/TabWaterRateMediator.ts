import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabWaterRateProxy from "../proxy/TabWaterRateProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";

export default class TabWaterRateMediator extends AbstractMediator {
    private myProxy: TabWaterRateProxy = <any>getProxy(TabWaterRateProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_user_table_columns, EventType.admin_plat_user_show, EventType.admin_plat_user_update];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_user_table_columns:
                    this.myProxy.setTableColumns(body);    
                break;
                case EventType.admin_plat_user_show:
                    this.myProxy.setTableData(body);
                    break;
                case EventType.admin_plat_user_update:
                    this.myProxy.api_admin_plat_user_show();
                    break;
            }
        }
    }
}
