import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabCommissionProxy from "../proxy/TabCommissionProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";

export default class TabCommissionMediator extends AbstractMediator {
    private myProxy: TabCommissionProxy = <any>getProxy(TabCommissionProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_commission_table_columns,
            EventType.admin_plat_user_commission_index,
            EventType.admin_plat_user_commission_show,
            EventType.admin_plat_user_commission_show_directs_water,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_user_commission_table_columns:
                    this.myProxy.setTableColumns(body);
                    this.myProxy.onQuery();
                    break;
                case EventType.admin_plat_user_commission_index:
                    this.myProxy.setTableData(body);
                    break;
                case EventType.admin_plat_user_commission_show:
                    this.myProxy.setDetail(body);
                    break;
                case EventType.admin_plat_user_commission_show_directs_water:
                    this.myProxy.setDirectWater(body);
                    break;
            }
        }
    }
}
