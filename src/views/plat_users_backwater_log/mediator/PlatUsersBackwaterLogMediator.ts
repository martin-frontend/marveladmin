import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_backwater_log/setting";
import { Message } from "element-ui";
import PlatUsersBackwaterLogProxy from "../proxy/PlatUsersBackwaterLogProxy";

interface IPlatUsersBackwaterLog extends IEventDispatcher {
    
}

export default class PlatUsersBackwaterLogMediator extends AbstractMediator {
    private myProxy: PlatUsersBackwaterLogProxy = <any>this.getProxy(PlatUsersBackwaterLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersBackwaterLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_backwater_log_table_columns,
            EventType.admin_plat_users_backwater_log_index,
            EventType.admin_plat_users_backwater_log_show,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersBackwaterLogProxy = <any>this.facade.retrieveProxy(PlatUsersBackwaterLogProxy.NAME);
        const myView: IPlatUsersBackwaterLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_backwater_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_backwater_log_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_backwater_log_show:
                myProxy.setDetail(body);
                break;
        }
    }
}
