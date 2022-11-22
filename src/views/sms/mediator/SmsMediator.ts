import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/sms/setting";
import { Message } from "element-ui";
import SmsProxy from "../proxy/SmsProxy";

interface ISms extends IEventDispatcher {}

export default class SmsMediator extends AbstractMediator {
    private myProxy: SmsProxy = <any>this.getProxy(SmsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ISms = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_sms_table_columns,
            EventType.admin_sms_index,
            EventType.admin_sms_show,
            EventType.admin_sms_store,
            EventType.admin_sms_update,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: SmsProxy = <any>this.facade.retrieveProxy(SmsProxy.NAME);
        const myView: ISms = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_sms_table_columns:
                myProxy.setTableCoulmns(body);
                break;
            case EventType.admin_sms_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_sms_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_sms_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_sms_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case GlobalEventType.REQUEST_ERROR:
                break;
        }
    }
}
