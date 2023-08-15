import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_payment_method/setting";
import { Message } from "element-ui";
import PlatUsersPaymentMethodProxy from "../proxy/PlatUsersPaymentMethodProxy";
import LangUtil from "@/core/global/LangUtil";

interface IPlatUsersPaymentMethod extends IEventDispatcher {}

export default class PlatUsersPaymentMethodMediator extends AbstractMediator {
    private myProxy: PlatUsersPaymentMethodProxy = <any>this.getProxy(PlatUsersPaymentMethodProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersPaymentMethod = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_payment_method_table_columns,
            EventType.admin_plat_users_payment_method_index,
            EventType.admin_plat_users_payment_method_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersPaymentMethodProxy = <any>this.facade.retrieveProxy(PlatUsersPaymentMethodProxy.NAME);
        const myView: IPlatUsersPaymentMethod = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_payment_method_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_payment_method_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_payment_method_update:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.onQuery();
                break;
        }
    }
}
