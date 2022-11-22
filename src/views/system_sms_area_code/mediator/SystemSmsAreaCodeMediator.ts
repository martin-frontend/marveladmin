import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/system_sms_area_code/setting";
import { Message } from "element-ui";
import SystemSmsAreaCodeProxy from "../proxy/SystemSmsAreaCodeProxy";

interface ISystemSmsAreaCode extends IEventDispatcher {}

export default class SystemSmsAreaCodeMediator extends AbstractMediator {
    private myProxy: SystemSmsAreaCodeProxy = <any>this.getProxy(SystemSmsAreaCodeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ISystemSmsAreaCode = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_system_sms_area_code_table_columns,
            EventType.admin_system_sms_area_code_index,
            EventType.admin_system_sms_area_code_store,
            EventType.admin_system_sms_area_code_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: SystemSmsAreaCodeProxy = <any>this.facade.retrieveProxy(SystemSmsAreaCodeProxy.NAME);
        const myView: ISystemSmsAreaCode = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_system_sms_area_code_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_system_sms_area_code_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_system_sms_area_code_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_system_sms_area_code_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
