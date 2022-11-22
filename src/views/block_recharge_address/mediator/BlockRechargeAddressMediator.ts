import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/block_recharge_address/setting";
import { Message } from "element-ui";
import BlockRechargeAddressProxy from "../proxy/BlockRechargeAddressProxy";

interface IBlockRechargeAddress extends IEventDispatcher {}

export default class BlockRechargeAddressMediator extends AbstractMediator {
    private myProxy: BlockRechargeAddressProxy = <any>this.getProxy(BlockRechargeAddressProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IBlockRechargeAddress = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_block_recharge_address_table_columns, EventType.admin_block_recharge_address_index];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: BlockRechargeAddressProxy = <any>this.facade.retrieveProxy(BlockRechargeAddressProxy.NAME);
        const myView: IBlockRechargeAddress = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_block_recharge_address_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_block_recharge_address_index:
                myProxy.setTableData(body);
                break;
        }
    }
}
