import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity_statistic/setting";
import { Message } from "element-ui";
import PlatActivityStatisticProxy from "../proxy/PlatActivityStatisticProxy";

interface IPlatActivityStatistic extends IEventDispatcher {}

export default class PlatActivityStatisticMediator extends AbstractMediator {
    private myProxy: PlatActivityStatisticProxy = <any>this.getProxy(PlatActivityStatisticProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivityStatistic = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_statistic_table_columns,
            EventType.admin_plat_activity_statistic_index,
            EventType.admin_plat_activity_statistic_user_table_columns,
            EventType.admin_plat_activity_statistic_user_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityStatisticProxy = <any>this.facade.retrieveProxy(PlatActivityStatisticProxy.NAME);
        const myView: IPlatActivityStatistic = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_statistic_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_activity_statistic_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_activity_statistic_user_table_columns:
                myProxy.setUserTableColumns(body);
                break;
            case EventType.admin_plat_activity_statistic_user_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setUserTableData(body);
                }
                break;
        }
    }
}
