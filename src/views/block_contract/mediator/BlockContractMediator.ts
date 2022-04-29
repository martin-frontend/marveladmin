import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_contract/setting";
import { Message } from "element-ui";
import BlockContractProxy from "../proxy/BlockContractProxy";

interface IBlockContract extends IEventDispatcher {

}

export default class BlockContractMediator extends AbstractMediator {
    private myProxy: BlockContractProxy = <any>this.getProxy(BlockContractProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockContract = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_block_contract_table_columns,
            EventType.admin_block_contract_index,
            EventType.admin_block_contract_show,
            EventType.admin_block_contract_store,
            EventType.admin_block_contract_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockContractProxy = <any>this.facade.retrieveProxy(BlockContractProxy.NAME);
        const myView: IBlockContract = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_contract_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_contract_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_block_contract_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_block_contract_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_block_contract_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;

        }
    }
}
