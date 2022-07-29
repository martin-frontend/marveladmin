import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_coin_days/setting";
import StatisticPlatCoinDaysProxy from "../proxy/StatisticPlatCoinDaysProxy";

interface IStatisticPlatCoinDays extends IEventDispatcher {

}

export default class StatisticPlatCoinDaysMediator extends AbstractMediator {
    private myProxy: StatisticPlatCoinDaysProxy = <any>this.getProxy(StatisticPlatCoinDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatCoinDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_coin_days_table_columns,
            EventType.admin_statistic_plat_coin_days_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatCoinDaysProxy = <any>this.facade.retrieveProxy(StatisticPlatCoinDaysProxy.NAME);
        const myView: IStatisticPlatCoinDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_coin_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_coin_days_index:
                myProxy.setTableData(body);
                break;

        }
    }
}
