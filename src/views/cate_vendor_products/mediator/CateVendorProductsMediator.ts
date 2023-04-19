import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/cate_vendor_products/setting";
import { Message } from "element-ui";
import CateVendorProductsProxy from "../proxy/CateVendorProductsProxy";

interface ICateVendorProducts extends IEventDispatcher {}

export default class CateVendorProductsMediator extends AbstractMediator {
    private myProxy: CateVendorProductsProxy = <any>this.getProxy(CateVendorProductsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICateVendorProducts = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_cate_vendor_products_table_columns,
            EventType.admin_cate_vendor_products_index,
            EventType.admin_cate_vendor_products_store,
            EventType.admin_cate_vendor_products_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CateVendorProductsProxy = <any>this.facade.retrieveProxy(CateVendorProductsProxy.NAME);
        const myView: ICateVendorProducts = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_cate_vendor_products_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_cate_vendor_products_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_cate_vendor_products_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_cate_vendor_products_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
