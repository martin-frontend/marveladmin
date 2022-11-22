import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/recharge_orders/setting";
import { Message } from "element-ui";
import RechargeOrdersProxy from "../proxy/RechargeOrdersProxy";
import i18n from "@/lang";

interface IRechargeOrders extends IEventDispatcher {}

export default class RechargeOrdersMediator extends AbstractMediator {
    private myProxy: RechargeOrdersProxy = <any>this.getProxy(RechargeOrdersProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IRechargeOrders = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_recharge_orders_table_columns,
            EventType.admin_recharge_orders_index,
            EventType.admin_recharge_orders_update_remark,
            EventType.admin_recharge_orders_update_complete,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: RechargeOrdersProxy = <any>this.facade.retrieveProxy(RechargeOrdersProxy.NAME);
        const myView: IRechargeOrders = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_recharge_orders_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_recharge_orders_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_recharge_orders_update_complete:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_recharge_orders_update_remark:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
        }
    }
}
