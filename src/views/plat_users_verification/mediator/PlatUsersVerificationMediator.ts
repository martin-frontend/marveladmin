import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_verification/setting";
import { Message } from "element-ui";
import PlatUsersVerificationProxy from "../proxy/PlatUsersVerificationProxy";

interface IPlatUsersVerification extends IEventDispatcher {
    
}

export default class PlatUsersVerificationMediator extends AbstractMediator {
    private myProxy: PlatUsersVerificationProxy = <any>this.getProxy(PlatUsersVerificationProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersVerification = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_verification_table_columns,
            EventType.admin_plat_users_verification_index,
            EventType.admin_plat_users_verification_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersVerificationProxy = <any>this.facade.retrieveProxy(PlatUsersVerificationProxy.NAME);
        const myView: IPlatUsersVerification = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_verification_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_verification_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_verification_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
