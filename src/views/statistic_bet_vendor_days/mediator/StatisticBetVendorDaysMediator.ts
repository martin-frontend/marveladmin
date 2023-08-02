import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_bet_vendor_days/setting";
import { Message } from "element-ui";
import StatisticBetVendorDaysProxy from "../proxy/StatisticBetVendorDaysProxy";

interface IStatisticBetVendorDays extends IEventDispatcher {
    
}

export default class StatisticBetVendorDaysMediator extends AbstractMediator {
    private myProxy: StatisticBetVendorDaysProxy = <any>this.getProxy(StatisticBetVendorDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticBetVendorDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_bet_vendor_days_table_columns,
            EventType.admin_statistic_bet_vendor_days_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticBetVendorDaysProxy = <any>this.facade.retrieveProxy(StatisticBetVendorDaysProxy.NAME);
        const myView: IStatisticBetVendorDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_bet_vendor_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_bet_vendor_days_index:
                //myProxy.setTableData(body);
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

        }
    }
}
