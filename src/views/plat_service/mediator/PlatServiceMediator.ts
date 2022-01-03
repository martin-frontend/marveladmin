import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_service/setting";
import { Message } from "element-ui";
import PlatServiceProxy from "../proxy/PlatServiceProxy";

interface IPlatService extends IEventDispatcher {

}

export default class PlatServiceMediator extends AbstractMediator {
    private myProxy: PlatServiceProxy = <any>this.getProxy(PlatServiceProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatService = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_fag_table_columns,
            EventType.admin_plats_fag_index,
            EventType.admin_plats_fag_show,
            EventType.admin_plats_fag_store,
            EventType.admin_plats_fag_update,
            EventType.admin_plats_fag_sync,
            EventType.admin_plat_show,
            EventType.admin_plat_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatServiceProxy = <any>this.facade.retrieveProxy(PlatServiceProxy.NAME);
        const myView: IPlatService = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_fag_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_fag_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plats_fag_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plats_fag_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plats_fag_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plats_fag_sync:
                myProxy.onQuery();
                break;
            case EventType.admin_plat_show:
                break;
            case EventType.admin_plat_update:
                break;

        }
    }
}
