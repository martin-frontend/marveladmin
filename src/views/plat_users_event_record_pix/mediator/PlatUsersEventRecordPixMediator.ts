import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_event_record_pix/setting";
import { Message } from "element-ui";
import PlatUsersEventRecordPixProxy from "../proxy/PlatUsersEventRecordPixProxy";

interface IPlatUsersEventRecordPix extends IEventDispatcher {}

export default class PlatUsersEventRecordPixMediator extends AbstractMediator {
    private myProxy: PlatUsersEventRecordPixProxy = <any>this.getProxy(PlatUsersEventRecordPixProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersEventRecordPix = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_event_record_pix_table_columns,
            EventType.admin_plat_users_event_record_pix_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersEventRecordPixProxy = <any>this.facade.retrieveProxy(PlatUsersEventRecordPixProxy.NAME);
        const myView: IPlatUsersEventRecordPix = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_event_record_pix_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_event_record_pix_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
        }
    }
}
