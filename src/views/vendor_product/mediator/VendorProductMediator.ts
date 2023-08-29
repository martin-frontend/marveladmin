import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vendor_product/setting";
import { Message } from "element-ui";
import VendorProductProxy from "../proxy/VendorProductProxy";

interface IVendorProduct extends IEventDispatcher {}

export default class VendorProductMediator extends AbstractMediator {
    private myProxy: VendorProductProxy = <any>this.getProxy(VendorProductProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVendorProduct = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vendor_product_table_columns,
            EventType.admin_vendor_product_index,
            EventType.admin_vendor_product_store,
            EventType.admin_vendor_product_show,
            EventType.admin_vendor_product_update,
            EventType.admin_vendor_show,
            EventType.admin_vendor_index,
            EventType.admin_vendor_product_import,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: VendorProductProxy = <any>this.facade.retrieveProxy(VendorProductProxy.NAME);
        const myView: IVendorProduct = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_vendor_product_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_vendor_product_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_vendor_product_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_vendor_product_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_vendor_product_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_vendor_show:
                myProxy.setVendorTypes(body.vendor_types);
                break;
            case EventType.admin_vendor_index:
                myProxy.setVendorId(body);
                break;
            case EventType.admin_vendor_product_import:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
        }
    }
}
