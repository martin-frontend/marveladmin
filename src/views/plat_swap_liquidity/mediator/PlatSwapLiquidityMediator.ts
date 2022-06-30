import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_swap_liquidity/setting";
import { Message } from "element-ui";
import PlatSwapLiquidityProxy from "../proxy/PlatSwapLiquidityProxy";

interface IPlatSwapLiquidity extends IEventDispatcher {}

export default class PlatSwapLiquidityMediator extends AbstractMediator {
    private myProxy: PlatSwapLiquidityProxy = <any>this.getProxy(PlatSwapLiquidityProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatSwapLiquidity = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_swap_liquidity_table_columns,
            EventType.admin_plat_swap_liquidity_index,
            EventType.admin_plat_swap_liquidity_update,
            EventType.admin_plat_swap_liquidity_update_liquidity,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatSwapLiquidityProxy = <any>this.facade.retrieveProxy(PlatSwapLiquidityProxy.NAME);
        const myView: IPlatSwapLiquidity = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_swap_liquidity_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_swap_liquidity_index:
                myProxy.setTableData(body);
                break;

            case EventType.admin_plat_swap_liquidity_update:
            case EventType.admin_plat_swap_liquidity_update_liquidity:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
