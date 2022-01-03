import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/recharge_plats_paymethods/setting";
import { Message } from "element-ui";
import RechargePlatsPaymethodsProxy from "../proxy/RechargePlatsPaymethodsProxy";

interface IRechargePlatsPaymethods extends IEventDispatcher {
    nextTick(): void;
}

export default class RechargePlatsPaymethodsMediator extends AbstractMediator {
    private myProxy: RechargePlatsPaymethodsProxy = <any>this.getProxy(RechargePlatsPaymethodsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IRechargePlatsPaymethods = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_recharge_plats_paymethods_table_columns,
            EventType.admin_recharge_plats_paymethods_index,
            EventType.admin_recharge_plats_paymethods_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: RechargePlatsPaymethodsProxy = <any>this.facade.retrieveProxy(RechargePlatsPaymethodsProxy.NAME);
        const myView: IRechargePlatsPaymethods = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_recharge_plats_paymethods_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_recharge_plats_paymethods_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_recharge_plats_paymethods_update:
                Message.success(SuccessMessage.update);
                myView.nextTick();
                break;
        }
    }
}
