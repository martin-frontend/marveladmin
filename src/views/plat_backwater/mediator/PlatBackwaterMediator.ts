import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_backwater/setting";
import { Message } from "element-ui";
import PlatBackwaterProxy from "../proxy/PlatBackwaterProxy";

interface IPlatBackwater extends IEventDispatcher {}

export default class PlatBackwaterMediator extends AbstractMediator {
    private myProxy: PlatBackwaterProxy = <any>this.getProxy(PlatBackwaterProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatBackwater = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_table_columns,
            EventType.admin_plat_index,
            EventType.admin_plat_show,
            EventType.admin_plat_update,
            EventType.admin_plat_users_backwater_model_table_columns,
            EventType.admin_plat_users_backwater_model_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatBackwaterProxy = <any>this.facade.retrieveProxy(PlatBackwaterProxy.NAME);
        const myView: IPlatBackwater = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_update:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_backwater_model_table_columns:
                break;
            case EventType.admin_plat_users_backwater_model_show:
                myProxy.setBackWaterModel(body);
                break;
        }
    }
}
