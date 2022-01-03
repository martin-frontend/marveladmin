import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user_sms_code/setting";
import { Message } from "element-ui";
import PlatUserSmsCodeProxy from "../proxy/PlatUserSmsCodeProxy";

interface IPlatUserSmsCode extends IEventDispatcher {
    
}

export default class PlatUserSmsCodeMediator extends AbstractMediator {
    private myProxy: PlatUserSmsCodeProxy = <any>this.getProxy(PlatUserSmsCodeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUserSmsCode = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_sms_code_table_columns,
            EventType.admin_plat_user_sms_code_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUserSmsCodeProxy = <any>this.facade.retrieveProxy(PlatUserSmsCodeProxy.NAME);
        const myView: IPlatUserSmsCode = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_sms_code_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_sms_code_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
