import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_register_same_ip_log/setting";
import { Message } from "element-ui";
import PlatRegisterSameIpLogProxy from "../proxy/PlatRegisterSameIpLogProxy";

interface IPlatRegisterSameIpLog extends IEventDispatcher {
    
}

export default class PlatRegisterSameIpLogMediator extends AbstractMediator {
    private myProxy: PlatRegisterSameIpLogProxy = <any>this.getProxy(PlatRegisterSameIpLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatRegisterSameIpLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_register_same_ip_log_table_columns,
            EventType.admin_plat_register_same_ip_log_index,
            EventType.admin_plat_register_same_ip_log_update,
            EventType.admin_plat_register_same_ip_log_show,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatRegisterSameIpLogProxy = <any>this.facade.retrieveProxy(PlatRegisterSameIpLogProxy.NAME);
        const myView: IPlatRegisterSameIpLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_register_same_ip_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_register_same_ip_log_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_register_same_ip_log_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_register_same_ip_log_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
