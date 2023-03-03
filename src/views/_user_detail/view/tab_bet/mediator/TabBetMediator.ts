import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabBetProxy from "../proxy/TabBetProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";

export default class TabBetMediator extends AbstractMediator {
    private myProxy: TabBetProxy = <any>getProxy(TabBetProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_bet_table_columns,
            EventType.admin_plat_users_bet_index,
            EventType.admin_plat_users_bet_show,
            EventType.admin_plat_users_bet_show_url,
            EventType.admin_plat_users_bet_credit_log_table_columns,
            EventType.admin_plat_users_bet_credit_log_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_users_bet_table_columns:
                    this.myProxy.setTableColumns(body);
                    this.myProxy.onQuery();
                    break;
                case EventType.admin_plat_users_bet_index:
                    this.myProxy.setTableData(body);
                    break;
                case EventType.admin_plat_users_bet_show:
                    this.myProxy.setDetail(body);
                    break;
                case EventType.admin_plat_users_bet_show_url:
                    window.open(body);
                    break;
                case EventType.admin_plat_users_bet_credit_log_table_columns:
                    this.myProxy.setCreditLogTableColumns(body);
                    break;
                case EventType.admin_plat_users_bet_credit_log_index:
                    this.myProxy.setCreditLogList(body);
                    break;
            }
        }
    }
}
