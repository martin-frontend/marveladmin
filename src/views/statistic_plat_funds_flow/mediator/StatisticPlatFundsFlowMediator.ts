import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_funds_flow/setting";
import { Message } from "element-ui";
import StatisticPlatFundsFlowProxy from "../proxy/StatisticPlatFundsFlowProxy";

interface IStatisticPlatFundsFlow extends IEventDispatcher {}

export default class StatisticPlatFundsFlowMediator extends AbstractMediator {
    private myProxy: StatisticPlatFundsFlowProxy = <any>this.getProxy(StatisticPlatFundsFlowProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatFundsFlow = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_funds_flow_table_columns,
            EventType.admin_statistic_plat_funds_flow_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatFundsFlowProxy = <any>this.facade.retrieveProxy(StatisticPlatFundsFlowProxy.NAME);
        const myView: IStatisticPlatFundsFlow = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_funds_flow_table_columns:
                myProxy.setTableColumns(body);
                break;

            case EventType.admin_statistic_plat_funds_flow_show:
                myProxy.setDetail(body);
                break;
        }
    }
}
