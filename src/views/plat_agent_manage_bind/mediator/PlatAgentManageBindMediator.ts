import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_agent_manage_bind/setting";
import { Message } from "element-ui";
import PlatAgentManageBindProxy from "../proxy/PlatAgentManageBindProxy";

interface IPlatAgentManageBind extends IEventDispatcher {}

export default class PlatAgentManageBindMediator extends AbstractMediator {
    private myProxy: PlatAgentManageBindProxy = <any>this.getProxy(PlatAgentManageBindProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAgentManageBind = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_agent_manage_bind_table_columns,
            EventType.admin_plat_agent_manage_bind_index,
            EventType.admin_plat_user_update,
            EventType.admin_plat_agent_bind_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAgentManageBindProxy = <any>this.facade.retrieveProxy(PlatAgentManageBindProxy.NAME);
        const myView: IPlatAgentManageBind = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_agent_manage_bind_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_agent_manage_bind_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_agent_bind_update:
            case EventType.admin_plat_user_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
        }
    }
}
