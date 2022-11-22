import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import i18n from "@/lang";
import { EventType, HttpType } from "@/views/vendor/setting";
import { Message } from "element-ui";
import VendorProxy from "../proxy/VendorProxy";

interface IVendor extends IEventDispatcher {}

export default class VendorMediator extends AbstractMediator {
    private myProxy: VendorProxy = <any>this.getProxy(VendorProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVendor = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vendor_table_columns,
            EventType.admin_vendor_index,
            EventType.admin_vendor_store,
            EventType.admin_vendor_show,
            EventType.admin_vendor_update,
            GlobalEventType.REQUEST_ERROR,
            EventType.admin_vendor_test_vendor,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: VendorProxy = <any>this.facade.retrieveProxy(VendorProxy.NAME);
        const myView: IVendor = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_vendor_table_columns:
                myProxy.setTableCoulmns(body);
                break;
            case EventType.admin_vendor_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_vendor_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_vendor_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_vendor_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case GlobalEventType.REQUEST_ERROR:
                break;
            case EventType.admin_vendor_test_vendor:
                Message.success(<any>LangUtil("操作成功"));
                break;
        }
    }
}
