import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_agent_keep_days/setting";
import { Message } from "element-ui";
import StatisticAgentKeepDaysProxy from "../proxy/StatisticAgentKeepDaysProxy";

interface IStatisticAgentKeepDays extends IEventDispatcher {}

export default class StatisticAgentKeepDaysMediator extends AbstractMediator {
    private myProxy: StatisticAgentKeepDaysProxy = <any>this.getProxy(StatisticAgentKeepDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticAgentKeepDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_agent_keep_days_table_columns,
            EventType.admin_statistic_agent_keep_days_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticAgentKeepDaysProxy = <any>this.facade.retrieveProxy(StatisticAgentKeepDaysProxy.NAME);
        const myView: IStatisticAgentKeepDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_agent_keep_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_agent_keep_days_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
