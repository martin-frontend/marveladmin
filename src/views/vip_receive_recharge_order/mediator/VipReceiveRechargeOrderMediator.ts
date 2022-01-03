import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_receive_recharge_order/setting";
import { Message } from "element-ui";
import VipReceiveRechargeOrderProxy from "../proxy/VipReceiveRechargeOrderProxy";

interface IVipReceiveRechargeOrder extends IEventDispatcher {}

export default class VipReceiveRechargeOrderMediator extends AbstractMediator {
    private myProxy: VipReceiveRechargeOrderProxy = <any>this.getProxy(VipReceiveRechargeOrderProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVipReceiveRechargeOrder = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vip_receive_recharge_order_table_columns,
            EventType.admin_vip_receive_recharge_order_index,
            EventType.admin_vip_receive_recharge_order_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: VipReceiveRechargeOrderProxy = <any>this.facade.retrieveProxy(VipReceiveRechargeOrderProxy.NAME);
        const myView: IVipReceiveRechargeOrder = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_vip_receive_recharge_order_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_vip_receive_recharge_order_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_vip_receive_recharge_order_show:
                // myProxy.setDetail(body);
                break;
        }
    }
}
