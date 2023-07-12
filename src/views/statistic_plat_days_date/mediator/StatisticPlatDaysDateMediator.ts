import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_days_date/setting";
import { Message } from "element-ui";
import StatisticPlatDaysDateProxy from "../proxy/StatisticPlatDaysDateProxy";

interface IStatisticPlatDaysDate extends IEventDispatcher {
    
}

export default class StatisticPlatDaysDateMediator extends AbstractMediator {
    myProxy: StatisticPlatDaysDateProxy = <any>this.getProxy(StatisticPlatDaysDateProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatDaysDate = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_days_table_columns,
            EventType.admin_statistic_plat_days_statistic_by_date,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatDaysDateProxy = <any>this.facade.retrieveProxy(StatisticPlatDaysDateProxy.NAME);
        const myView: IStatisticPlatDaysDate = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            // case EventType.undefined:
            //     myProxy.setTableData(body);
            //     break;
            // case EventType.undefined:
            //     myProxy.setDetail(body);
            //     break;
            // case EventType.undefined:
            //     Message.success(SuccessMessage.create);
            //     myProxy.hideDialog();
            //     myProxy.listQuery.page_count = 1;
            //     myProxy.onQuery();
            //     break;
            // case EventType.undefined:
            //     Message.success(SuccessMessage.update);
            //     myProxy.hideDialog();
            //     myProxy.onQuery();
            //     break;
            case EventType.admin_statistic_plat_days_statistic_by_date:
                myProxy.setTableData(body);
                break;

        }
    }
}
