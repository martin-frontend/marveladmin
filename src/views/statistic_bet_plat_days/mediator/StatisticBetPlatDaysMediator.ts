import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_bet_plat_days/setting";
import { Message } from "element-ui";
import StatisticBetPlatDaysProxy from "../proxy/StatisticBetPlatDaysProxy";

interface IStatisticBetPlatDays extends IEventDispatcher {}

export default class StatisticBetPlatDaysMediator extends AbstractMediator {
    private myProxy: StatisticBetPlatDaysProxy = <any>this.getProxy(StatisticBetPlatDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticBetPlatDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_statistic_bet_plat_days_table_columns, EventType.admin_statistic_bet_plat_days_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticBetPlatDaysProxy = <any>this.facade.retrieveProxy(StatisticBetPlatDaysProxy.NAME);
        const myView: IStatisticBetPlatDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_bet_plat_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_bet_plat_days_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
        }
    }
}
