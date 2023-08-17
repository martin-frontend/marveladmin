import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_days_deliver_channel/setting";
import { Message } from "element-ui";
import StatisticPlatDaysDeliverChannelProxy from "../proxy/StatisticPlatDaysDeliverChannelProxy";

interface IStatisticPlatDaysDeliverChannel extends IEventDispatcher {}

export default class StatisticPlatDaysDeliverChannelMediator extends AbstractMediator {
    myProxy: StatisticPlatDaysDeliverChannelProxy = <any>this.getProxy(StatisticPlatDaysDeliverChannelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatDaysDeliverChannel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_days_deliver_channel_table_columns,
            EventType.admin_statistic_plat_days_deliver_channel_index,
            EventType.admin_statistic_plat_days_deliver_edit_deliver_name,
            EventType.admin_statistic_plat_days_deliver_group_table_columns,
            EventType.admin_statistic_plat_days_deliver_group_index,
            EventType.admin_statistic_plat_days_deliver_group_edit_group_name,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        // const myProxy: StatisticPlatDaysDeliverChannelProxy = <any>(
        //     this.facade.retrieveProxy(StatisticPlatDaysDeliverChannelProxy.NAME)
        // );
        const myView: IStatisticPlatDaysDeliverChannel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_days_deliver_channel_table_columns:
                this.myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_days_deliver_channel_index:
                if (this.myProxy.exportData.isExportExcel) {
                    this.myProxy.onSaveExportData(body);
                } else {
                    this.myProxy.setTableData(body);
                }
                break;
            case EventType.admin_statistic_plat_days_deliver_edit_deliver_name:
                Message.success(SuccessMessage.update);
                this.myProxy.hideDialog();
                this.myProxy.onQuery();
                break;
        }
    }
}
