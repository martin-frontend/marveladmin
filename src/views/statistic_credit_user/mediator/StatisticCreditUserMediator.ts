import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_credit_user/setting";
import { Message } from "element-ui";
import StatisticCreditUserProxy from "../proxy/StatisticCreditUserProxy";

interface IStatisticCreditUser extends IEventDispatcher {

}

export default class StatisticCreditUserMediator extends AbstractMediator {
    private myProxy: StatisticCreditUserProxy = <any>this.getProxy(StatisticCreditUserProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticCreditUser = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_credit_user_table_columns,
            EventType.admin_statistic_credit_user_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticCreditUserProxy = <any>this.facade.retrieveProxy(StatisticCreditUserProxy.NAME);
        const myView: IStatisticCreditUser = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_credit_user_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_credit_user_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
        }
    }
}
