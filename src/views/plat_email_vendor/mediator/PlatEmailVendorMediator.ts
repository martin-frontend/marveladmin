import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_email_vendor/setting";
import { Message } from "element-ui";
import PlatEmailVendorProxy from "../proxy/PlatEmailVendorProxy";

interface IPlatEmailVendor extends IEventDispatcher {}

export default class PlatEmailVendorMediator extends AbstractMediator {
    private myProxy: PlatEmailVendorProxy = <any>this.getProxy(PlatEmailVendorProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatEmailVendor = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_email_vendor_table_columns,
            EventType.admin_plat_email_vendor_index,
            EventType.admin_plat_email_vendor_show,
            EventType.admin_plat_email_vendor_store,
            EventType.admin_plat_email_vendor_update,
            EventType.admin_plat_email_vendor_test_send,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: IPlatEmailVendor = this.viewComponent;
        const body = notification.getBody();
        const myProxy: PlatEmailVendorProxy = <any>this.facade.retrieveProxy(PlatEmailVendorProxy.NAME);
        switch (notification.getName()) {
            case EventType.admin_plat_email_vendor_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_email_vendor_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_email_vendor_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_email_vendor_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_email_vendor_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_email_vendor_test_send:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                break;
        }
    }
}
