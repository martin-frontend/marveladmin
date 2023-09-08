import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_pops/setting";
import { Message } from "element-ui";
import PlatPopsProxy from "../proxy/PlatPopsProxy";

interface IPlatPops extends IEventDispatcher {
    
}

export default class PlatPopsMediator extends AbstractMediator {
    private myProxy: PlatPopsProxy = <any>this.getProxy(PlatPopsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatPops = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_pops_table_columns,
            EventType.admin_plat_pops_index,
            EventType.admin_plat_pops_show,
            EventType.admin_plat_pops_store,
            EventType.admin_plat_pops_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatPopsProxy = <any>this.facade.retrieveProxy(PlatPopsProxy.NAME);
        const myView: IPlatPops = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_pops_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_pops_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_pops_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_pops_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_pops_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
