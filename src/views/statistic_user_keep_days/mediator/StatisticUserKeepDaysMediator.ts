import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_user_keep_days/setting";
import { Message } from "element-ui";
import StatisticUserKeepDaysProxy from "../proxy/StatisticUserKeepDaysProxy";

interface IStatisticUserKeepDays extends IEventDispatcher {}

export default class StatisticUserKeepDaysMediator extends AbstractMediator {
    private myProxy: StatisticUserKeepDaysProxy = <any>this.getProxy(StatisticUserKeepDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticUserKeepDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_statistic_user_keep_days_table_columns, EventType.admin_statistic_user_keep_days_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticUserKeepDaysProxy = <any>this.facade.retrieveProxy(StatisticUserKeepDaysProxy.NAME);
        const myView: IStatisticUserKeepDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_user_keep_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_user_keep_days_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
        }
    }
}
