import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_network/setting";
import { Message } from "element-ui";
import BlockNetworkProxy from "../proxy/BlockNetworkProxy";

interface IBlockNetwork extends IEventDispatcher {}

export default class BlockNetworkMediator extends AbstractMediator {
    private myProxy: BlockNetworkProxy = <any>this.getProxy(BlockNetworkProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockNetwork = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_block_network_table_columns,
            EventType.admin_block_network_index,
            EventType.admin_block_network_show,
            EventType.admin_block_network_store,
            EventType.admin_block_network_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockNetworkProxy = <any>this.facade.retrieveProxy(BlockNetworkProxy.NAME);
        const myView: IBlockNetwork = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_network_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_network_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_block_network_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_block_network_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_block_network_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
