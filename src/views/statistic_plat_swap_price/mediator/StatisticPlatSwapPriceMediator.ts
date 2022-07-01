import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_swap_price/setting";
import { Message } from "element-ui";
import StatisticPlatSwapPriceProxy from "../proxy/StatisticPlatSwapPriceProxy";

interface IStatisticPlatSwapPrice extends IEventDispatcher {}

export default class StatisticPlatSwapPriceMediator extends AbstractMediator {
    private myProxy: StatisticPlatSwapPriceProxy = <any>this.getProxy(StatisticPlatSwapPriceProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatSwapPrice = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_swap_price_table_columns,
            EventType.admin_statistic_plat_swap_price_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatSwapPriceProxy = <any>this.facade.retrieveProxy(StatisticPlatSwapPriceProxy.NAME);
        const myView: IStatisticPlatSwapPrice = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_swap_price_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_swap_price_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
