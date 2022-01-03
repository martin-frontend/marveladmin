import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_vip_model/setting";
import { Message } from "element-ui";
import PlatUsersVipModelProxy from "../proxy/PlatUsersVipModelProxy";

interface IPlatUsersVipModel extends IEventDispatcher {
    
}

export default class PlatUsersVipModelMediator extends AbstractMediator {
    private myProxy: PlatUsersVipModelProxy = <any>this.getProxy(PlatUsersVipModelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersVipModel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_vip_model_table_columns,
            EventType.admin_plat_users_vip_model_index,
            EventType.admin_plat_users_vip_model_show,
            EventType.admin_plat_users_vip_model_store,
            EventType.admin_plat_users_vip_model_update,
            EventType.admin_plat_users_vip_model_destroy,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersVipModelProxy = <any>this.facade.retrieveProxy(PlatUsersVipModelProxy.NAME);
        const myView: IPlatUsersVipModel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_vip_model_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_vip_model_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_vip_model_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_users_vip_model_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_vip_model_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
