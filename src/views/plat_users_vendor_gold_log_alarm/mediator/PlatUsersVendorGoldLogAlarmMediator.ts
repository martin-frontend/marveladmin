import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_vendor_gold_log_alarm/setting";
import { Message } from "element-ui";
import PlatUsersVendorGoldLogAlarmProxy from "../proxy/PlatUsersVendorGoldLogAlarmProxy";

interface IPlatUsersVendorGoldLogAlarm extends IEventDispatcher {
    
}

export default class PlatUsersVendorGoldLogAlarmMediator extends AbstractMediator {
    private myProxy: PlatUsersVendorGoldLogAlarmProxy = <any>this.getProxy(PlatUsersVendorGoldLogAlarmProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersVendorGoldLogAlarm = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_vendor_gold_log_alarm_table_columns,
            EventType.admin_plat_users_vendor_gold_log_alarm_index,
            EventType.admin_plat_users_vendor_gold_log_alarm_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersVendorGoldLogAlarmProxy = <any>this.facade.retrieveProxy(PlatUsersVendorGoldLogAlarmProxy.NAME);
        const myView: IPlatUsersVendorGoldLogAlarm = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_vendor_gold_log_alarm_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_vendor_gold_log_alarm_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_vendor_gold_log_alarm_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
