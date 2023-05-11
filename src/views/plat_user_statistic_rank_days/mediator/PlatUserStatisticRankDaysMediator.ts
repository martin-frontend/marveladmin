import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user_statistic_rank_days/setting";
import { Message } from "element-ui";
import PlatUserStatisticRankDaysProxy from "../proxy/PlatUserStatisticRankDaysProxy";

interface IPlatUserStatisticRankDays extends IEventDispatcher { }

export default class PlatUserStatisticRankDaysMediator extends AbstractMediator {
    private myProxy: PlatUserStatisticRankDaysProxy = <any>this.getProxy(PlatUserStatisticRankDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUserStatisticRankDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_statistic_rank_days_table_columns,
            EventType.admin_plat_user_statistic_rank_days_index,
            EventType.admin_plat_user_statistic_rank_days_store,
            EventType.admin_plat_user_statistic_rank_days_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUserStatisticRankDaysProxy = <any>(
            this.facade.retrieveProxy(PlatUserStatisticRankDaysProxy.NAME)
        );
        const myView: IPlatUserStatisticRankDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_statistic_rank_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_statistic_rank_days_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_user_statistic_rank_days_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_user_statistic_rank_days_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
