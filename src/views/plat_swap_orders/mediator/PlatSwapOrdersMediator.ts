import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_swap_orders/setting";
import { Message } from "element-ui";
import PlatSwapOrdersProxy from "../proxy/PlatSwapOrdersProxy";

interface IPlatSwapOrders extends IEventDispatcher {}

export default class PlatSwapOrdersMediator extends AbstractMediator {
    private myProxy: PlatSwapOrdersProxy = <any>this.getProxy(PlatSwapOrdersProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatSwapOrders = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_swap_orders_table_columns, EventType.admin_plat_swap_orders_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatSwapOrdersProxy = <any>this.facade.retrieveProxy(PlatSwapOrdersProxy.NAME);
        const myView: IPlatSwapOrders = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_swap_orders_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_swap_orders_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
