import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user_statistic_days/setting";
import { Message } from "element-ui";
import PlatUserStatisticDaysProxy from "../proxy/PlatUserStatisticDaysProxy";

interface IPlatUserStatisticDays extends IEventDispatcher {}

export default class PlatUserStatisticDaysMediator extends AbstractMediator {
    private myProxy: PlatUserStatisticDaysProxy = <any>this.getProxy(PlatUserStatisticDaysProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUserStatisticDays = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_statistic_days_table_columns,
            EventType.admin_plat_user_statistic_days_index,
            EventType.admin_plat_user_statistic_days_store,
            EventType.admin_plat_user_statistic_days_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUserStatisticDaysProxy = <any>this.facade.retrieveProxy(PlatUserStatisticDaysProxy.NAME);
        const myView: IPlatUserStatisticDays = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_statistic_days_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_statistic_days_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_user_statistic_days_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_user_statistic_days_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
