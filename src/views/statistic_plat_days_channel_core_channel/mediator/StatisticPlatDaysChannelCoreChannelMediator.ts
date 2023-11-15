import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_days_channel_core_channel/setting";
import { Message } from "element-ui";
import StatisticPlatDaysChannelCoreChannelProxy from "../proxy/StatisticPlatDaysChannelCoreChannelProxy";

interface IStatisticPlatDaysChannelCoreChannel extends IEventDispatcher {

}

export default class StatisticPlatDaysChannelCoreChannelMediator extends AbstractMediator {
    private myProxy: StatisticPlatDaysChannelCoreChannelProxy = <any>this.getProxy(StatisticPlatDaysChannelCoreChannelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatDaysChannelCoreChannel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_days_channel_core_channel_table_columns,
            EventType.admin_statistic_plat_days_channel_core_channel_index,
            EventType.admin_statistic_plat_days_channel_core_group_table_columns,
            EventType.admin_statistic_plat_days_channel_core_group_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatDaysChannelCoreChannelProxy = <any>this.facade.retrieveProxy(StatisticPlatDaysChannelCoreChannelProxy.NAME);
        const myView: IStatisticPlatDaysChannelCoreChannel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_days_channel_core_channel_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_days_channel_core_channel_index:
            case EventType.admin_statistic_plat_days_channel_core_group_index:
                if (this.myProxy.exportData.isExportExcel) {
                    this.myProxy.onSaveExportData(body);
                } else {
                    this.myProxy.setTableData(body);
                }
                break;
            case EventType.admin_statistic_plat_days_channel_core_group_table_columns:
                this.myProxy.setTableColumnsByGroyp(body);
                break;
        }
    }
}
