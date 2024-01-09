import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_plat_directly_commission/setting";
import { Message } from "element-ui";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import LangUtil from "@/core/global/LangUtil";

interface IStatisticPlatDirectlyCommission extends IEventDispatcher {

}

export default class StatisticPlatDirectlyCommissionMediator extends AbstractMediator {
    private myProxy: StatisticPlatDirectlyCommissionProxy = <any>this.getProxy(StatisticPlatDirectlyCommissionProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IStatisticPlatDirectlyCommission = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_statistic_plat_directly_commission_table_columns,
            EventType.admin_statistic_plat_directly_commission_index,
            EventType.admin_statistic_plat_directly_user_commission_table_columns,
            EventType.admin_statistic_plat_directly_user_commission_index,
            EventType.admin_plat_channel_table_columns,
            EventType.admin_plat_channel_index,
            EventType.admin_plat_channel_update,
            EventType.admin_plat_agent_bind_update,
            EventType.admin_plat_user_agent_bonus_send_mail,
            EventType.admin_plat_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: StatisticPlatDirectlyCommissionProxy = <any>this.facade.retrieveProxy(StatisticPlatDirectlyCommissionProxy.NAME);
        const myView: IStatisticPlatDirectlyCommission = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_statistic_plat_directly_commission_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_statistic_plat_directly_commission_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_channel_update:
                Message.success(SuccessMessage.update);
                myProxy.onQueryChannel();
                break;
            case EventType.admin_statistic_plat_directly_user_commission_table_columns:
                myProxy.setDetailTableColumns(body);
                break;
            case EventType.admin_statistic_plat_directly_user_commission_index:
                myProxy.setDetailTableData(body);
                break;
            case EventType.admin_plat_agent_bind_update:
                Message.success(SuccessMessage.update);
                myProxy.onQueryDetailTable();
                break;
            case EventType.admin_plat_update:
                Message.success(SuccessMessage.update);
                myProxy.hideSettingDialog();
                break;
            case EventType.admin_plat_user_agent_bonus_send_mail:
                Message.success(LangUtil("发送成功"));
                myProxy.hideBonusDialog();
                myProxy.onQueryDetailTable();
                break;
            case EventType.admin_plat_channel_index:
                myProxy.setChannelTableData(body);
                break;
        }
    }
}
