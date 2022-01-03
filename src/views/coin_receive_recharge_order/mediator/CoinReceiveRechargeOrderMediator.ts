import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/coin_receive_recharge_order/setting";
import { Message } from "element-ui";
import CoinReceiveRechargeOrderProxy from "../proxy/CoinReceiveRechargeOrderProxy";

interface ICoinReceiveRechargeOrder extends IEventDispatcher {

}

export default class CoinReceiveRechargeOrderMediator extends AbstractMediator {
    private myProxy: CoinReceiveRechargeOrderProxy = <any>this.getProxy(CoinReceiveRechargeOrderProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICoinReceiveRechargeOrder = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_coin_receive_recharge_order_table_columns,
            EventType.admin_coin_receive_recharge_order_index,
            EventType.admin_coin_receive_recharge_order_show,
            EventType.admin_coin_receive_recharge_order_close,
            EventType.admin_coin_receive_recharge_order_confirm,
            EventType.admin_coin_wallet_wallet,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CoinReceiveRechargeOrderProxy = <any>this.facade.retrieveProxy(CoinReceiveRechargeOrderProxy.NAME);
        const myView: ICoinReceiveRechargeOrder = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_coin_receive_recharge_order_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_coin_receive_recharge_order_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_coin_receive_recharge_order_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_coin_receive_recharge_order_close:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_coin_receive_recharge_order_confirm:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_coin_wallet_wallet:
                myProxy.coinWallet = body;
                break;

        }
    }
}
