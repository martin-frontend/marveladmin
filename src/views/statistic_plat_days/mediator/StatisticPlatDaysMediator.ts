import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_days/setting";
import { Message } from "element-ui";
import StatisticPlatDaysProxy from "../proxy/StatisticPlatDaysProxy";

interface IStatisticPlatDays extends IEventDispatcher {}

export default class StatisticPlatDaysMediator extends AbstractMediator {
    myProxy: StatisticPlatDaysProxy = <any>this.getProxy(StatisticPlatDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_statistic_plat_days_table_columns, EventType.admin_statistic_plat_days_index];
    }

    handleNotification(notification: puremvc.INotification) {
        // const myProxy: StatisticPlatDaysProxy = <any>this.facade.retrieveProxy(StatisticPlatDaysProxy.NAME);
        const myView: IStatisticPlatDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_days_table_columns:
                this.myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_days_index:
                if (this.myProxy.listQuery.page_size == 100000) {
                    this.myProxy.onSetExcelData(body);
                } else {
                    this.myProxy.setTableData(body);
                }
                break;
        }
    }
}
