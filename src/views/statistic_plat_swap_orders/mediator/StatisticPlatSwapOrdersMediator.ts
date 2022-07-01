import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_swap_orders/setting";
import { Message } from "element-ui";
import StatisticPlatSwapOrdersProxy from "../proxy/StatisticPlatSwapOrdersProxy";

interface IStatisticPlatSwapOrders extends IEventDispatcher {}

export default class StatisticPlatSwapOrdersMediator extends AbstractMediator {
    private myProxy: StatisticPlatSwapOrdersProxy = <any>this.getProxy(StatisticPlatSwapOrdersProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatSwapOrders = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_swap_orders_table_columns,
            EventType.admin_statistic_plat_swap_orders_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatSwapOrdersProxy = <any>this.facade.retrieveProxy(StatisticPlatSwapOrdersProxy.NAME);
        const myView: IStatisticPlatSwapOrders = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_swap_orders_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_swap_orders_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
