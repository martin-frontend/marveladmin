import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabTeamProxy from "../proxy/TabTeamProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";

export default class TabTeamMediator extends AbstractMediator {
    private myProxy: TabTeamProxy = <any>getProxy(TabTeamProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_agent_bind_index, EventType.admin_plat_agent_bind_show];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_agent_bind_index:
                    this.myProxy.addTree(body);
                    break;
                case EventType.admin_plat_agent_bind_show:
                    this.myProxy.setRoot(body);
                    break;
            }
        }
    }
}
