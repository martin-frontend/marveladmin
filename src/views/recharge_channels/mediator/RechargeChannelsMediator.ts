import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/recharge_channels/setting";
import { Message } from "element-ui";
import RechargeChannelsProxy from "../proxy/RechargeChannelsProxy";

interface IRechargeChannels extends IEventDispatcher {}

export default class RechargeChannelsMediator extends AbstractMediator {
    private myProxy: RechargeChannelsProxy = <any>this.getProxy(RechargeChannelsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IRechargeChannels = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_recharge_channels_table_columns,
            EventType.admin_recharge_channels_index,
            EventType.admin_recharge_channels_show,
            EventType.admin_recharge_channels_store,
            EventType.admin_recharge_channels_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: RechargeChannelsProxy = <any>this.facade.retrieveProxy(RechargeChannelsProxy.NAME);
        const myView: IRechargeChannels = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_recharge_channels_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_recharge_channels_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_recharge_channels_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_recharge_channels_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_recharge_channels_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
