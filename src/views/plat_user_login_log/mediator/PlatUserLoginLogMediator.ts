import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user_login_log/setting";

interface IPlatUserLoginLog extends IEventDispatcher {
    setTableColumns(value: any): void;
    setTableData(value: any): void;
}

export default class PlatUserLoginLogMediator extends AbstractMediator {
    onRegister() {
        this.facade.sendNotification(HttpType.admin_plat_user_login_log_table_columns);
        this.facade.sendNotification(HttpType.admin_plat_user_login_log_index, {
            page_count: 1,
            page_size: 20,
        });
    }

    protected initViewData() {
        const myView: IPlatUserLoginLog = this.viewComponent;
        myView.addEventListener("pagination", this.onPagination, this);
    }
    private onPagination(value: any) {
        this.facade.sendNotification(HttpType.admin_plat_user_login_log_index, {
            page_count: value,
            page_size: 20,
        });
    }
    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_login_log_table_columns,
            EventType.admin_plat_user_login_log_index,
            EventType.admin_plat_user_login_log_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: IPlatUserLoginLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_login_log_table_columns:
                myView.setTableColumns(body);
                break;
            case EventType.admin_plat_user_login_log_index:
                myView.setTableData(body);
                break;
            case EventType.admin_plat_user_login_log_show:
                break;
        }
    }
}
