import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_stake/setting";
import { Message } from "element-ui";
import PlatStakeProxy from "../proxy/PlatStakeProxy";

interface IPlatStake extends IEventDispatcher {
    
}

export default class PlatStakeMediator extends AbstractMediator {
    private myProxy: PlatStakeProxy = <any>this.getProxy(PlatStakeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatStake = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_stake_log_table_columns,
            EventType.admin_plat_stake_log_index,
            EventType.admin_plat_stake_user_log_table_columns,
            EventType.admin_plat_stake_user_log_index,
            EventType.admin_plat_stake_pool_log_table_columns,
            EventType.admin_plat_stake_pool_log_index,
            EventType.admin_plat_stake_pool_log_update,
            EventType.admin_plat_stake_bonus_log_table_columns,
            EventType.admin_plat_stake_bonus_log_index,
            EventType.admin_plat_stake_bonus_user_log_table_columns,
            EventType.admin_plat_stake_bonus_user_log_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatStakeProxy = <any>this.facade.retrieveProxy(PlatStakeProxy.NAME);
        const myView: IPlatStake = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_stake_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_stake_log_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_stake_pool_log_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_stake_user_log_table_columns:
                break;
            case EventType.admin_plat_stake_user_log_index:
                break;
            case EventType.admin_plat_stake_pool_log_table_columns:
                break;
            case EventType.admin_plat_stake_pool_log_index:
                break;
            case EventType.admin_plat_stake_bonus_log_table_columns:
                break;
            case EventType.admin_plat_stake_bonus_log_index:
                break;
            case EventType.admin_plat_stake_bonus_user_log_table_columns:
                break;
            case EventType.admin_plat_stake_bonus_user_log_index:
                break;

        }
    }
}
