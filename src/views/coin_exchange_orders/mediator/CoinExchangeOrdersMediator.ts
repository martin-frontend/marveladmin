import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import SelfModel from "@/core/model/SelfModel";
import { EventType, HttpType } from "@/views/coin_exchange_orders/setting";
import { Message } from "element-ui";
import CoinExchangeOrdersProxy from "../proxy/CoinExchangeOrdersProxy";

interface ICoinExchangeOrders extends IEventDispatcher {
    
}

export default class CoinExchangeOrdersMediator extends AbstractMediator {
    private myProxy: CoinExchangeOrdersProxy = <any>this.getProxy(CoinExchangeOrdersProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICoinExchangeOrders = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_coin_exchange_orders_table_columns,
            EventType.admin_coin_exchange_orders_index,
            EventType.admin_coin_exchange_orders_finish_order,
            EventType.admin_coin_exchange_orders_close_order_return_gold,
            EventType.admin_coin_exchange_orders_close_order,
            EventType.admin_admin_user_mine
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CoinExchangeOrdersProxy = <any>this.facade.retrieveProxy(CoinExchangeOrdersProxy.NAME);
        const myView: ICoinExchangeOrders = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_coin_exchange_orders_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_coin_exchange_orders_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                }
                else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_coin_exchange_orders_finish_order:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                this.sendNotification(HttpType.admin_admin_user_mine, { modules: "[4]" });
                break;
            case EventType.admin_coin_exchange_orders_close_order_return_gold:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                this.sendNotification(HttpType.admin_admin_user_mine, { modules: "[4]" });
                break;
            case EventType.admin_coin_exchange_orders_close_order:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                this.sendNotification(HttpType.admin_admin_user_mine, { modules: "[4]" });
                break;
            case EventType.admin_admin_user_mine:{
                let model: SelfModel = this.getProxy(SelfModel);
                model.userInfo.coin_user["gold"] = body.coin_user.gold;
                break;
            }
        }
    }
}
