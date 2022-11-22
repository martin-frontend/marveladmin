import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_backwater_model/setting";
import { Message } from "element-ui";
import PlatUsersBackwaterModelProxy from "../proxy/PlatUsersBackwaterModelProxy";

interface IPlatUsersBackwaterModel extends IEventDispatcher {}

export default class PlatUsersBackwaterModelMediator extends AbstractMediator {
    private myProxy: PlatUsersBackwaterModelProxy = <any>this.getProxy(PlatUsersBackwaterModelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersBackwaterModel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_backwater_model_table_columns,
            EventType.admin_plat_users_backwater_model_index,
            EventType.admin_plat_users_backwater_model_show,
            EventType.admin_plat_users_backwater_model_store,
            EventType.admin_plat_users_backwater_model_update,
            EventType.admin_plat_users_backwater_model_destroy,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersBackwaterModelProxy = <any>this.facade.retrieveProxy(PlatUsersBackwaterModelProxy.NAME);
        const myView: IPlatUsersBackwaterModel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_backwater_model_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_backwater_model_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_backwater_model_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_users_backwater_model_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_backwater_model_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
