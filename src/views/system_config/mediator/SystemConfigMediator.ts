import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/system_config/setting";
import { Message } from "element-ui";
import SystemConfigProxy from "../proxy/SystemConfigProxy";

interface ISystemConfig extends IEventDispatcher {}

export default class SystemConfigMediator extends AbstractMediator {
    private myProxy: SystemConfigProxy = <any>this.getProxy(SystemConfigProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ISystemConfig = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_system_config_table_columns,
            EventType.admin_system_config_index,
            EventType.admin_system_config_store,
            EventType.admin_system_config_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: SystemConfigProxy = <any>this.facade.retrieveProxy(SystemConfigProxy.NAME);
        const myView: ISystemConfig = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_system_config_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_system_config_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_system_config_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_system_config_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
