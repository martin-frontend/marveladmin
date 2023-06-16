import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_replenish_recharge_order/setting";
import { Message } from "element-ui";
import VipReplenishRechargeOrderProxy from "../proxy/VipReplenishRechargeOrderProxy";

interface IVipReplenishRechargeOrder extends IEventDispatcher {

}

export default class VipReplenishRechargeOrderMediator extends AbstractMediator {
    private myProxy: VipReplenishRechargeOrderProxy = <any>this.getProxy(VipReplenishRechargeOrderProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVipReplenishRechargeOrder = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vip_replenish_recharge_order_table_columns,
            EventType.admin_vip_replenish_recharge_order_index,
            EventType.admin_vip_replenish_recharge_order_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: VipReplenishRechargeOrderProxy = <any>this.facade.retrieveProxy(VipReplenishRechargeOrderProxy.NAME);
        const myView: IVipReplenishRechargeOrder = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_vip_replenish_recharge_order_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_vip_replenish_recharge_order_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_vip_replenish_recharge_order_show:
                // myProxy.setDetail(body);
                break;
        }
    }
}
