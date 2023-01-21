import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_agent_credit/setting";
import { Message } from "element-ui";
import StatisticAgentCreditProxy from "../proxy/StatisticAgentCreditProxy";

interface IStatisticAgentCredit extends IEventDispatcher {}

export default class StatisticAgentCreditMediator extends AbstractMediator {
    private myProxy: StatisticAgentCreditProxy = <any>this.getProxy(StatisticAgentCreditProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticAgentCredit = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_credit_table_columns,
            EventType.admin_statistic_agent_credit_index,
            EventType.admin_statistic_agent_credit_user_show,
            EventType.admin_statistic_agent_credit_user_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticAgentCreditProxy = <any>this.facade.retrieveProxy(StatisticAgentCreditProxy.NAME);
        const myView: IStatisticAgentCredit = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_credit_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_agent_credit_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_statistic_agent_credit_user_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_statistic_agent_credit_user_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
