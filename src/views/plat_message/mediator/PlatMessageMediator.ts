import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_message/setting";
import { Message } from "element-ui";
import PlatMessageProxy from "../proxy/PlatMessageProxy";

interface IPlatMessage extends IEventDispatcher {
    
}

export default class PlatMessageMediator extends AbstractMediator {
    private myProxy: PlatMessageProxy = <any>this.getProxy(PlatMessageProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatMessage = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_message_table_columns,
            EventType.admin_plat_message_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatMessageProxy = <any>this.facade.retrieveProxy(PlatMessageProxy.NAME);
        const myView: IPlatMessage = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_message_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_message_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
