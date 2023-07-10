import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_coin_keep_days/setting";
import { Message } from "element-ui";
import StatisticCoinKeepDaysProxy from "../proxy/StatisticCoinKeepDaysProxy";

interface IStatisticCoinKeepDays extends IEventDispatcher {
    
}

export default class StatisticCoinKeepDaysMediator extends AbstractMediator {
    private myProxy: StatisticCoinKeepDaysProxy = <any>this.getProxy(StatisticCoinKeepDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticCoinKeepDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_coin_keep_days_table_columns,
            EventType.admin_statistic_coin_keep_days_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticCoinKeepDaysProxy = <any>this.facade.retrieveProxy(StatisticCoinKeepDaysProxy.NAME);
        const myView: IStatisticCoinKeepDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_coin_keep_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_coin_keep_days_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
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
            // case EventType.admin_statistic_coin_keep_days_table_columns:
            //     break;
            // case EventType.admin_statistic_coin_keep_days_index:
            //     break;

        }
    }
}
