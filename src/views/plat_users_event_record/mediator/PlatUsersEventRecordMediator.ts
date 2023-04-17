import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_event_record/setting";
import { Message } from "element-ui";
import PlatUsersEventRecordProxy from "../proxy/PlatUsersEventRecordProxy";

interface IPlatUsersEventRecord extends IEventDispatcher {

}

export default class PlatUsersEventRecordMediator extends AbstractMediator {
    private myProxy: PlatUsersEventRecordProxy = <any>this.getProxy(PlatUsersEventRecordProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersEventRecord = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_event_record_table_columns,
            EventType.admin_plat_users_event_record_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersEventRecordProxy = <any>this.facade.retrieveProxy(PlatUsersEventRecordProxy.NAME);
        const myView: IPlatUsersEventRecord = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_event_record_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_event_record_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
