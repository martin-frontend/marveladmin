import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_vip/setting";
import { Message } from "element-ui";
import PlatVipProxy from "../proxy/PlatVipProxy";

interface IPlatVip extends IEventDispatcher {}

export default class PlatVipMediator extends AbstractMediator {
    private myProxy: PlatVipProxy = <any>this.getProxy(PlatVipProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatVip = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_table_columns,
            EventType.admin_plat_index,
            EventType.admin_plat_show,
            EventType.admin_plat_update,
            EventType.admin_plat_users_vip_model_table_columns,
            EventType.admin_plat_users_vip_model_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatVipProxy = <any>this.facade.retrieveProxy(PlatVipProxy.NAME);
        const myView: IPlatVip = this.viewComponent;
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
                myProxy.isEdit = !myProxy.isEdit;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_vip_model_table_columns:
                break;
            case EventType.admin_plat_users_vip_model_show:
                myProxy.setVipModel(body);
                break;
        }
    }
}
