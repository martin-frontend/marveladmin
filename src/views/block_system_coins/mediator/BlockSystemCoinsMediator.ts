import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_system_coins/setting";
import { Message } from "element-ui";
import BlockSystemCoinsProxy from "../proxy/BlockSystemCoinsProxy";

interface IBlockSystemCoins extends IEventDispatcher {}

export default class BlockSystemCoinsMediator extends AbstractMediator {
    private myProxy: BlockSystemCoinsProxy = <any>this.getProxy(BlockSystemCoinsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockSystemCoins = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_block_system_coins_table_columns,
            EventType.admin_block_system_coins_index,
            EventType.admin_block_system_coins_store,
            EventType.admin_block_system_coins_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockSystemCoinsProxy = <any>this.facade.retrieveProxy(BlockSystemCoinsProxy.NAME);
        const myView: IBlockSystemCoins = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_system_coins_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_system_coins_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_block_system_coins_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_block_system_coins_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
