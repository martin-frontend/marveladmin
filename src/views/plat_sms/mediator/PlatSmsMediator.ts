import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_sms/setting";
import { Message } from "element-ui";
import PlatSmsProxy from "../proxy/PlatSmsProxy";

interface IPlatSms extends IEventDispatcher {
    
}

export default class PlatSmsMediator extends AbstractMediator {
    private myProxy: PlatSmsProxy = <any>this.getProxy(PlatSmsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatSms = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_sms_table_columns,
            EventType.admin_plat_sms_index,
            EventType.admin_plat_sms_show,
            EventType.admin_plat_sms_store,
            EventType.admin_plat_sms_update,
            EventType.admin_plat_sms_send,
            EventType.admin_plat_sms_getBalance,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatSmsProxy = <any>this.facade.retrieveProxy(PlatSmsProxy.NAME);
        const myView: IPlatSms = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_sms_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_sms_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_sms_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_sms_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_sms_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_sms_send:
                myProxy.hideMessageDialog();
                break;
            case EventType.admin_plat_sms_getBalance:
                myProxy.tableData.balance = body.balance;
                break;
        }
    }
}
