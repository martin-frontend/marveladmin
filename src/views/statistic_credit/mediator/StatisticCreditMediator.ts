import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_credit/setting";
import { Message } from "element-ui";
import StatisticCreditProxy from "../proxy/StatisticCreditProxy";

interface IStatisticCredit extends IEventDispatcher {}

export default class StatisticCreditMediator extends AbstractMediator {
    private myProxy: StatisticCreditProxy = <any>this.getProxy(StatisticCreditProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticCredit = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_statistic_credit_table_columns, EventType.admin_statistic_credit_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticCreditProxy = <any>this.facade.retrieveProxy(StatisticCreditProxy.NAME);
        const myView: IStatisticCredit = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_credit_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_credit_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
