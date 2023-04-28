import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/exchange_channel_method/setting";
import { Message } from "element-ui";
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";

interface IExchangeChannelMethod extends IEventDispatcher { }

export default class ExchangeChannelMethodMediator extends AbstractMediator {
    private myProxy: ExchangeChannelMethodProxy = <any>this.getProxy(ExchangeChannelMethodProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IExchangeChannelMethod = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_exchange_channel_table_columns,
            EventType.admin_exchange_channel_index,
            EventType.admin_exchange_channel_method_table_columns,
            EventType.admin_exchange_channel_method_show,
            EventType.admin_exchange_channel_method_store,
            EventType.admin_exchange_channel_method_update,
            EventType.admin_exchange_channel_method_index,
            EventType.admin_exchange_channel_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: ExchangeChannelMethodProxy = <any>this.facade.retrieveProxy(ExchangeChannelMethodProxy.NAME);
        const myView: IExchangeChannelMethod = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_exchange_channel_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_exchange_channel_method_table_columns:
                myProxy.setMethodTableColumns(body);
                break;
            case EventType.admin_exchange_channel_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_exchange_channel_method_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_exchange_channel_method_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.onQuery();
                myProxy.api_admin_exchange_channel_method_index();
                break;
            case EventType.admin_exchange_channel_method_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                myProxy.api_admin_exchange_channel_method_index();
                break;
            case EventType.admin_exchange_channel_method_index:
                myProxy.set_exchange_channel_method_index(body);
                break;
            case EventType.admin_exchange_channel_update:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
        }
    }
}
