import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/system_fag/setting";
import { Message } from "element-ui";
import SystemFagProxy from "../proxy/SystemFagProxy";

interface ISystemFag extends IEventDispatcher {

}

export default class SystemFagMediator extends AbstractMediator {
    private myProxy: SystemFagProxy = <any>this.getProxy(SystemFagProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ISystemFag = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_system_fag_table_columns,
            EventType.admin_system_fag_index,
            EventType.admin_system_fag_show,
            EventType.admin_system_fag_store,
            EventType.admin_system_fag_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: SystemFagProxy = <any>this.facade.retrieveProxy(SystemFagProxy.NAME);
        const myView: ISystemFag = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_system_fag_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_system_fag_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_system_fag_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_system_fag_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_system_fag_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
