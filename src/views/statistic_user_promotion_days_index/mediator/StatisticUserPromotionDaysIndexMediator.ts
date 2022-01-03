import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_user_promotion_days_index/setting";
import { Message } from "element-ui";
import StatisticUserPromotionDaysIndexProxy from "../proxy/StatisticUserPromotionDaysIndexProxy";

interface IStatisticUserPromotionDaysIndex extends IEventDispatcher {}

export default class StatisticUserPromotionDaysIndexMediator extends AbstractMediator {
    private myProxy: StatisticUserPromotionDaysIndexProxy = <any>this.getProxy(StatisticUserPromotionDaysIndexProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticUserPromotionDaysIndex = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_user_promotion_days_table_columns,
            EventType.admin_statistic_user_promotion_days_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticUserPromotionDaysIndexProxy = <any>(
            this.facade.retrieveProxy(StatisticUserPromotionDaysIndexProxy.NAME)
        );
        const myView: IStatisticUserPromotionDaysIndex = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_user_promotion_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_user_promotion_days_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
