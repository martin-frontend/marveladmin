import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_coin_days_date/setting";
import StatisticPlatCoinDaysDateProxy from "../proxy/StatisticPlatCoinDaysDateProxy";

interface IStatisticPlatCoinDaysDate extends IEventDispatcher {

}

export default class StatisticPlatCoinDaysDateMediator extends AbstractMediator {

    private myProxy: StatisticPlatCoinDaysDateProxy = <any>this.getProxy(StatisticPlatCoinDaysDateProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }


    protected initViewData() {
        const myView: IStatisticPlatCoinDaysDate = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_coin_days_table_columns,
            EventType.admin_statistic_plat_coin_days_statistic_by_date,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatCoinDaysDateProxy = <any>this.facade.retrieveProxy(StatisticPlatCoinDaysDateProxy.NAME);
        const myView: IStatisticPlatCoinDaysDate = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_coin_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_coin_days_statistic_by_date:
                if (this.myProxy.listQuery.page_size == 100000) {
                    myProxy.onSetExcelData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
        }
    }
}
