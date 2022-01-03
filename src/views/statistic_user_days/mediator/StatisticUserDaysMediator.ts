import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_user_days/setting";
import { Message } from "element-ui";
import StatisticUserDaysProxy from "../proxy/StatisticUserDaysProxy";

interface IStatisticUserDays extends IEventDispatcher {}

export default class StatisticUserDaysMediator extends AbstractMediator {
    private myProxy: StatisticUserDaysProxy = <any>this.getProxy(StatisticUserDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticUserDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_statistic_user_days_table_columns, EventType.admin_statistic_user_days_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticUserDaysProxy = <any>this.facade.retrieveProxy(StatisticUserDaysProxy.NAME);
        const myView: IStatisticUserDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_user_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_user_days_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
