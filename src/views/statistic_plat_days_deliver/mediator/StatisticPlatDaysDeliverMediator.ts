import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_days_deliver/setting";
import { Message } from "element-ui";
import StatisticPlatDaysDeliverProxy from "../proxy/StatisticPlatDaysDeliverProxy";

interface IStatisticPlatDaysDeliver extends IEventDispatcher {}

export default class StatisticPlatDaysDeliverMediator extends AbstractMediator {
    myProxy: StatisticPlatDaysDeliverProxy = <any>this.getProxy(StatisticPlatDaysDeliverProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatDaysDeliver = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_days_deliver_table_columns,
            EventType.admin_statistic_plat_days_deliver_index,
            EventType.admin_statistic_plat_days_deliver_edit_deliver_use,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        // const myProxy: StatisticPlatDaysDeliverProxy = <any>(
        //     this.facade.retrieveProxy(StatisticPlatDaysDeliverProxy.NAME)
        // );
        const myView: IStatisticPlatDaysDeliver = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_days_deliver_table_columns:
                this.myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_days_deliver_index:
                if (this.myProxy.exportData.isExportExcel) {
                    this.myProxy.onSaveExportData(body);
                } else {
                    this.myProxy.setTableData(body);
                }
                break;
            case EventType.admin_statistic_plat_days_deliver_edit_deliver_use:
                Message.success(SuccessMessage.update);
                this.myProxy.hideDialog();
                this.myProxy.onQuery();
                break;
        }
    }
}
