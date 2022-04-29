import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_transfer_out_order/setting";
import { Message } from "element-ui";
import BlockTransferOutOrderProxy from "../proxy/BlockTransferOutOrderProxy";

interface IBlockTransferOutOrder extends IEventDispatcher {

}

export default class BlockTransferOutOrderMediator extends AbstractMediator {
    private myProxy: BlockTransferOutOrderProxy = <any>this.getProxy(BlockTransferOutOrderProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockTransferOutOrder = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_block_transfer_out_order_table_columns,
            EventType.admin_block_transfer_out_order_index,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockTransferOutOrderProxy = <any>this.facade.retrieveProxy(BlockTransferOutOrderProxy.NAME);
        const myView: IBlockTransferOutOrder = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_transfer_out_order_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_transfer_out_order_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
