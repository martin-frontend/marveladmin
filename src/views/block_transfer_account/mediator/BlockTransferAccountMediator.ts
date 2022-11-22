import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_transfer_account/setting";
import { Message } from "element-ui";
import BlockTransferAccountProxy from "../proxy/BlockTransferAccountProxy";

interface IBlockTransferAccount extends IEventDispatcher {}

export default class BlockTransferAccountMediator extends AbstractMediator {
    private myProxy: BlockTransferAccountProxy = <any>this.getProxy(BlockTransferAccountProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockTransferAccount = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_block_transfer_account_table_columns,
            EventType.admin_block_transfer_account_index,
            EventType.admin_block_transfer_account_show,
            EventType.admin_block_transfer_account_store,
            EventType.admin_block_transfer_account_update,
            EventType.admin_block_transfer_account_balance,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockTransferAccountProxy = <any>this.facade.retrieveProxy(BlockTransferAccountProxy.NAME);
        const myView: IBlockTransferAccount = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_transfer_account_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_transfer_account_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_block_transfer_account_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_block_transfer_account_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_block_transfer_account_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_block_transfer_account_balance:
                break;
        }
    }
}
