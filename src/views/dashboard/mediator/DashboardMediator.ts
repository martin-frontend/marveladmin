import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/dashboard/setting";
import { Message } from "element-ui";
import DashboardProxy from "../proxy/DashboardProxy";

interface IDashboard extends IEventDispatcher {}

export default class DashboardMediator extends AbstractMediator {
    private myProxy: DashboardProxy = <any>this.getProxy(DashboardProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IDashboard = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_index_statistic_table_columns,
            EventType.admin_index_statistic_yesterday_statistic,
            EventType.admin_index_statistic_today_statistic,
            EventType.admin_index_statistic_recharge_statistic,
            EventType.admin_index_statistic_exchange_statistic,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: DashboardProxy = <any>this.facade.retrieveProxy(DashboardProxy.NAME);
        const myView: IDashboard = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_index_statistic_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_index_statistic_yesterday_statistic:
                myProxy.setYesterdayStatistic(body);
                break;
            case EventType.admin_index_statistic_today_statistic:
                myProxy.setTodayStatistic(body);
                break;
            case EventType.admin_index_statistic_recharge_statistic:
                myProxy.setRecharge(body);
                break;
            case EventType.admin_index_statistic_exchange_statistic:
                myProxy.setExchange(body);
                break;
        }
    }
}
