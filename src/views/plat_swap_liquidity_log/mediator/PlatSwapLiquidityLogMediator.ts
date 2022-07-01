import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_swap_liquidity_log/setting";
import { Message } from "element-ui";
import PlatSwapLiquidityLogProxy from "../proxy/PlatSwapLiquidityLogProxy";

interface IPlatSwapLiquidityLog extends IEventDispatcher {}

export default class PlatSwapLiquidityLogMediator extends AbstractMediator {
    private myProxy: PlatSwapLiquidityLogProxy = <any>this.getProxy(PlatSwapLiquidityLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatSwapLiquidityLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_swap_liquidity_log_table_columns, EventType.admin_plat_swap_liquidity_log_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatSwapLiquidityLogProxy = <any>this.facade.retrieveProxy(PlatSwapLiquidityLogProxy.NAME);
        const myView: IPlatSwapLiquidityLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_swap_liquidity_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_swap_liquidity_log_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
