import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/email_vendor/setting";
import { Message } from "element-ui";
import EmailVendorProxy from "../proxy/EmailVendorProxy";

interface IEmailVendor extends IEventDispatcher {

}

export default class EmailVendorMediator extends AbstractMediator {

    private myProxy: EmailVendorProxy = <any>this.getProxy(EmailVendorProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IEmailVendor = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_email_vendor_table_columns,
            EventType.admin_email_vendor_index,
            EventType.admin_email_vendor_show,
            EventType.admin_email_vendor_store,
            EventType.admin_email_vendor_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: EmailVendorProxy = <any>this.facade.retrieveProxy(EmailVendorProxy.NAME);
        const myView: IEmailVendor = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_email_vendor_table_columns:
                myProxy.setTableCoulmns(body);
                break;
            case EventType.admin_email_vendor_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_email_vendor_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_email_vendor_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_email_vendor_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;

        }
    }
}
