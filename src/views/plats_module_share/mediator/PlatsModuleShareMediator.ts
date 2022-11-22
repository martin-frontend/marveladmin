import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plats_module_share/setting";
import { Message } from "element-ui";
import PlatsModuleShareProxy from "../proxy/PlatsModuleShareProxy";

interface IPlatsModuleShare extends IEventDispatcher {}

export default class PlatsModuleShareMediator extends AbstractMediator {
    private myProxy: PlatsModuleShareProxy = <any>this.getProxy(PlatsModuleShareProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatsModuleShare = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_module_share_table_columns,
            EventType.admin_plats_module_share_index,
            EventType.admin_plats_module_share_store,
            EventType.admin_plats_module_share_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatsModuleShareProxy = <any>this.facade.retrieveProxy(PlatsModuleShareProxy.NAME);
        const myView: IPlatsModuleShare = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_module_share_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_module_share_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plats_module_share_store:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                break;
            case EventType.admin_plats_module_share_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                break;
        }
    }
}
