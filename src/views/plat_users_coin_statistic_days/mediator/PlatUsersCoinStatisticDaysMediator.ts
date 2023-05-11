import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_coin_statistic_days/setting";
import { Message } from "element-ui";
import PlatUsersCoinStatisticDaysProxy from "../proxy/PlatUsersCoinStatisticDaysProxy";

interface IPlatUsersCoinStatisticDays extends IEventDispatcher {

}

export default class PlatUsersCoinStatisticDaysMediator extends AbstractMediator {
    private myProxy: PlatUsersCoinStatisticDaysProxy = <any>this.getProxy(PlatUsersCoinStatisticDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersCoinStatisticDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_coin_statistic_days_table_columns,
            EventType.admin_plat_users_coin_statistic_days_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersCoinStatisticDaysProxy = <any>this.facade.retrieveProxy(PlatUsersCoinStatisticDaysProxy.NAME);
        const myView: IPlatUsersCoinStatisticDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_coin_statistic_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_coin_statistic_days_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
