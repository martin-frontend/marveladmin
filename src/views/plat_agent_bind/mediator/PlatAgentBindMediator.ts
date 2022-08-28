import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_agent_bind/setting";
import { Message } from "element-ui";
import PlatAgentBindProxy from "../proxy/PlatAgentBindProxy";

interface IPlatAgentBind extends IEventDispatcher {}

export default class PlatAgentBindMediator extends AbstractMediator {
    private myProxy: PlatAgentBindProxy = <any>this.getProxy(PlatAgentBindProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAgentBind = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_agent_bind_table_columns,
            EventType.admin_plat_agent_bind_index,
            EventType.admin_plat_agent_bind_show,
            EventType.admin_plat_agent_bind_show_floor_range,
            EventType.admin_plat_agent_bind_update,
            EventType.admin_plat_user_change_bind,
            EventType.admin_plat_agent_bonus_config_table_columns,
            EventType.admin_plat_agent_bonus_config_show,
            EventType.admin_plat_agent_bonus_config_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAgentBindProxy = <any>this.facade.retrieveProxy(PlatAgentBindProxy.NAME);
        const myView: IPlatAgentBind = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_agent_bind_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_agent_bind_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_agent_bind_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_agent_bind_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.hideAgentBonus();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_agent_bind_show_floor_range:
                myProxy.setFloorRange(body);
                break;
            case EventType.admin_plat_user_change_bind:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_agent_bonus_config_table_columns:
                myProxy.setBonusConfigTableColumns(body);
                break;
            case EventType.admin_plat_agent_bonus_config_show:
                myProxy.setBonusConfigTableData(body);
                break;
    }
    }
}
