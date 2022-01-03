import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_agent_bonus/setting";
import { Message } from "element-ui";
import PlatAgentBonusProxy from "../proxy/PlatAgentBonusProxy";

interface IPlatAgentBonus extends IEventDispatcher {
    
}

export default class PlatAgentBonusMediator extends AbstractMediator {
    private myProxy: PlatAgentBonusProxy = <any>this.getProxy(PlatAgentBonusProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAgentBonus = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_agent_bonus_table_columns,
            EventType.admin_plat_agent_bonus_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAgentBonusProxy = <any>this.facade.retrieveProxy(PlatAgentBonusProxy.NAME);
        const myView: IPlatAgentBonus = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_agent_bonus_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_agent_bonus_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
