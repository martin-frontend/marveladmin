import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/menu_vendor_products/setting";
import { Message } from "element-ui";
import MenuVendorProductsProxy from "../proxy/MenuVendorProductsProxy";

interface IMenuVendorProducts extends IEventDispatcher {

}

export default class MenuVendorProductsMediator extends AbstractMediator {
    private myProxy: MenuVendorProductsProxy = <any>this.getProxy(MenuVendorProductsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IMenuVendorProducts = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_menu_vendor_products_table_columns,
            EventType.admin_menu_vendor_products_index,
            EventType.admin_menu_vendor_products_show,
            EventType.admin_menu_vendor_products_store,
            EventType.admin_menu_vendor_products_update,
            EventType.admin_resource_upload,
            EventType.admin_plat_show,
            EventType.admin_plat_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: MenuVendorProductsProxy = <any>this.facade.retrieveProxy(MenuVendorProductsProxy.NAME);
        const myView: IMenuVendorProducts = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_menu_vendor_products_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_menu_vendor_products_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_menu_vendor_products_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_menu_vendor_products_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_menu_vendor_products_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.hideLanguagesDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_resource_upload:
                myProxy.setImageUrl(body);
                break;
            case EventType.admin_plat_show:
                myProxy.setVendorSort(body);
                break;
            case EventType.admin_plat_update:
                Message.success(SuccessMessage.update);
                myProxy.hideSortDialog();
                break;
        }
    }
}
