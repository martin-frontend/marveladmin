import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_gold_log/setting";
import { Message } from "element-ui";
import PlatUsersGoldLogProxy from "../proxy/PlatUsersGoldLogProxy";

interface IPlatUsersGoldLog extends IEventDispatcher {
    
}

export default class PlatUsersGoldLogMediator extends AbstractMediator {
    private myProxy: PlatUsersGoldLogProxy = <any>this.getProxy(PlatUsersGoldLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersGoldLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_gold_log_table_columns,
            EventType.admin_plat_users_gold_log_index,
            EventType.admin_plat_users_gold_log_show,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersGoldLogProxy = <any>this.facade.retrieveProxy(PlatUsersGoldLogProxy.NAME);
        const myView: IPlatUsersGoldLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_gold_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_gold_log_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_gold_log_show:
                myProxy.setDetail(body);
                break;
        }
    }
}
