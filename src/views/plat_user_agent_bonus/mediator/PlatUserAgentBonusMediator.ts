import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user_agent_bonus/setting";
import { Message } from "element-ui";
import PlatUserAgentBonusProxy from "../proxy/PlatUserAgentBonusProxy";
import LangUtil from "@/core/global/LangUtil";

interface IPlatUserAgentBonus extends IEventDispatcher {

}

export default class PlatUserAgentBonusMediator extends AbstractMediator {
    private myProxy: PlatUserAgentBonusProxy = <any>this.getProxy(PlatUserAgentBonusProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUserAgentBonus = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_agent_bonus_table_columns,
            EventType.admin_plat_user_agent_bonus_index,
            EventType.admin_plat_user_agent_bonus_send_mail,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUserAgentBonusProxy = <any>this.facade.retrieveProxy(PlatUserAgentBonusProxy.NAME);
        const myView: IPlatUserAgentBonus = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_agent_bonus_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_agent_bonus_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_user_agent_bonus_send_mail:
                Message.success(LangUtil("发送成功"));
                myProxy.hideDialog();
                break;
        }
    }
}
