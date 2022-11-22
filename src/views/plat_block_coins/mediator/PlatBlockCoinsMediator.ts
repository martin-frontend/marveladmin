import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_block_coins/setting";
import { Message } from "element-ui";
import PlatBlockCoinsProxy from "../proxy/PlatBlockCoinsProxy";

interface IPlatBlockCoins extends IEventDispatcher {}

export default class PlatBlockCoinsMediator extends AbstractMediator {
    private myProxy: PlatBlockCoinsProxy = <any>this.getProxy(PlatBlockCoinsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatBlockCoins = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_block_coins_table_columns,
            EventType.admin_plat_block_coins_index,
            EventType.admin_plat_block_coins_store,
            EventType.admin_plat_block_coins_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatBlockCoinsProxy = <any>this.facade.retrieveProxy(PlatBlockCoinsProxy.NAME);
        const myView: IPlatBlockCoins = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_block_coins_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_block_coins_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_block_coins_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_block_coins_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
