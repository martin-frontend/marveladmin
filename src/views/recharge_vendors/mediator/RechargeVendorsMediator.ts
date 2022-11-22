import AbstractMediator from "@/core/abstract/AbstractMediator";
import { objectRemoveNull } from "@/core/global/Functions";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/recharge_vendors/setting";
import { Message } from "element-ui";
import { SuccessMessage } from "@/core/global/Constant";
import RechargeVendorsProxy from "../proxy/RechargeVendorsProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

export interface IRechargeVendors extends IEventDispatcher {
    showDetail(): void;
}

export default class RechargeVendorsMediator extends AbstractMediator {
    private myProxy: RechargeVendorsProxy = <any>this.getProxy(RechargeVendorsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IRechargeVendors = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_recharge_vendors_table_columns,
            EventType.admin_recharge_vendors_index,
            EventType.admin_recharge_vendors_show,
            EventType.admin_recharge_vendors_store,
            EventType.admin_recharge_vendors_update,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: RechargeVendorsProxy = <any>this.facade.retrieveProxy(RechargeVendorsProxy.NAME);
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_recharge_vendors_table_columns:
                this.myProxy.setTableColumns(body);
                break;
            case EventType.admin_recharge_vendors_index:
                this.myProxy.setTableData(body);
                break;
            case EventType.admin_recharge_vendors_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_recharge_vendors_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_recharge_vendors_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case GlobalEventType.REQUEST_ERROR:
                break;
        }
    }
}
