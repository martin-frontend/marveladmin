import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/recharge_channels_paymethods/setting";
import { Message } from "element-ui";
import RechargeChannelsPaymethodsProxy from "../proxy/RechargeChannelsPaymethodsProxy";

interface IRechargeChannelsPaymethods extends IEventDispatcher {}

export default class RechargeChannelsPaymethodsMediator extends AbstractMediator {
    private myProxy: RechargeChannelsPaymethodsProxy = <any>this.getProxy(RechargeChannelsPaymethodsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IRechargeChannelsPaymethods = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_recharge_channels_table_columns,
            EventType.admin_recharge_channels_index,
            EventType.admin_recharge_channels_update,
            EventType.admin_recharge_channels_paymethods_table_columns,
            EventType.admin_recharge_channels_paymethods_index,
            EventType.admin_recharge_channels_paymethods_show,
            EventType.admin_recharge_channels_paymethods_store,
            EventType.admin_recharge_channels_paymethods_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: RechargeChannelsPaymethodsProxy = <any>(
            this.facade.retrieveProxy(RechargeChannelsPaymethodsProxy.NAME)
        );
        const myView: IRechargeChannelsPaymethods = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_recharge_channels_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_recharge_channels_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_recharge_channels_paymethods_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_recharge_channels_paymethods_store:
                Message.success(SuccessMessage.create);
                myProxy.hideAddDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.getDialogData();
                break;
            case EventType.admin_recharge_channels_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_recharge_channels_paymethods_table_columns:
                myProxy.setDialogTableColumns(body);
                break;
            case EventType.admin_recharge_channels_paymethods_index:
                myProxy.setDialogTableData(body);
                break;
            case EventType.admin_recharge_channels_paymethods_update:
                Message.success(SuccessMessage.update);
                myProxy.hideAddDialog();
                myProxy.getDialogData();
                break;
        }
    }
}
