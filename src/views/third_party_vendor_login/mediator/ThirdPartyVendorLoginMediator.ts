import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/third_party_vendor_login/setting";
import { Message } from "element-ui";
import ThirdPartyVendorLoginProxy from "../proxy/ThirdPartyVendorLoginProxy";

interface IThirdPartyVendorLogin extends IEventDispatcher {
    
}

export default class ThirdPartyVendorLoginMediator extends AbstractMediator {
    private myProxy: ThirdPartyVendorLoginProxy = <any>this.getProxy(ThirdPartyVendorLoginProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IThirdPartyVendorLogin = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_third_party_vendor_login_table_columns,
            EventType.admin_third_party_vendor_login_index,
            EventType.admin_third_party_vendor_login_show,
            EventType.admin_third_party_vendor_login_store,
            EventType.admin_third_party_vendor_login_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: ThirdPartyVendorLoginProxy = <any>this.facade.retrieveProxy(ThirdPartyVendorLoginProxy.NAME);
        const myView: IThirdPartyVendorLogin = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_third_party_vendor_login_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_third_party_vendor_login_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_third_party_vendor_login_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_third_party_vendor_login_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_third_party_vendor_login_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;

        }
    }
}
