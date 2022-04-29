import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_transfer_in_order/setting";
import { Message } from "element-ui";
import BlockTransferInOrderProxy from "../proxy/BlockTransferInOrderProxy";

interface IBlockTransferInOrder extends IEventDispatcher {

}

export default class BlockTransferInOrderMediator extends AbstractMediator {
    private myProxy: BlockTransferInOrderProxy = <any>this.getProxy(BlockTransferInOrderProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockTransferInOrder = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_block_transfer_in_order_table_columns,
            EventType.admin_block_transfer_in_order_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockTransferInOrderProxy = <any>this.facade.retrieveProxy(BlockTransferInOrderProxy.NAME);
        const myView: IBlockTransferInOrder = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_transfer_in_order_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_transfer_in_order_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
