import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_user/setting";
import { Message } from "element-ui";
import AdminUserProxy from "../proxy/AdminUserProxy";

interface IAdminUser extends IEventDispatcher {}

export default class AdminUserMediator extends AbstractMediator {
    private myProxy: AdminUserProxy = <any>this.getProxy(AdminUserProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IAdminUser = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_admin_user_table_columns,
            EventType.admin_admin_user_index,
            EventType.admin_admin_user_show,
            EventType.admin_admin_user_store,
            EventType.admin_admin_user_update,
            EventType.admin_plat_channel_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: AdminUserProxy = <any>this.facade.retrieveProxy(AdminUserProxy.NAME);
        const myView: IAdminUser = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_user_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_admin_user_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_admin_user_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_admin_user_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_admin_user_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_channel_index:
                myProxy.setChannels(body.list);
                break;
        }
    }
}
