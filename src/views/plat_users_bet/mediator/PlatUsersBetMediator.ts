import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_bet/setting";
import PlatUsersBetProxy from "../proxy/PlatUsersBetProxy";

interface IPlatUsersBet extends IEventDispatcher { }

export default class PlatUsersBetMediator extends AbstractMediator {
    private myProxy: PlatUsersBetProxy = <any>this.getProxy(PlatUsersBetProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersBet = this.viewComponent;
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
        const myProxy: PlatUsersBetProxy = <any>this.facade.retrieveProxy(PlatUsersBetProxy.NAME);
        const myView: IPlatUsersBet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_bet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_bet_index:
                myProxy.exportData.isSearch = true;
                if (myProxy.exportData.stop) {
                    myProxy.exportData.stop = false;
                } else {
                    if (myProxy.exportData.isExportExcel) {
                        myProxy.onSaveExportData(body);
                    } else {
                        myProxy.setTableData(body);
                    }
                }
                break;
            case EventType.admin_plat_users_bet_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_users_bet_show_url:
                window.open(body);
                break;

            case EventType.admin_plat_users_bet_credit_log_table_columns:
                myProxy.setCreditLogTableColumns(body);
                break;

            case EventType.admin_plat_users_bet_credit_log_index:
                myProxy.setCreditLogList(body);
                break;
        }
    }
}
