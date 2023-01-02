import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_agent_manage/setting";
import { Message } from "element-ui";
import PlatAgentManageProxy from "../proxy/PlatAgentManageProxy";

interface IPlatAgentManage extends IEventDispatcher {}

export default class PlatAgentManageMediator extends AbstractMediator {
    private myProxy: PlatAgentManageProxy = <any>this.getProxy(PlatAgentManageProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAgentManage = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_agent_manage_table_columns,
            EventType.admin_plat_agent_manage_index,
            EventType.admin_plat_agent_manage_store,
            EventType.admin_plat_agent_manage_update,
            EventType.admin_plat_agent_manage_update_user,
            EventType.admin_plat_agent_manage_delete,
            EventType.admin_plat_agent_manage_change_bind,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAgentManageProxy = <any>this.facade.retrieveProxy(PlatAgentManageProxy.NAME);
        const myView: IPlatAgentManage = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_agent_manage_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_agent_manage_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_agent_manage_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                myProxy.onGetTableColumns();
                break;
            case EventType.admin_plat_agent_manage_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onGetTableColumns();
                break;
            case EventType.admin_plat_agent_manage_update_user:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                myProxy.onGetTableColumns();
                break;
            case EventType.admin_plat_agent_manage_delete:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_agent_manage_change_bind:
                myProxy.dialogData.canChangeBind = true;
                myProxy.onUpdate();
        }
    }
}
