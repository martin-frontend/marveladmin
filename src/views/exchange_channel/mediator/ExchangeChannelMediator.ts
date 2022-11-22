import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/exchange_channel/setting";
import { Message } from "element-ui";
import ExchangeChannelProxy from "../proxy/ExchangeChannelProxy";

interface IExchangeChannel extends IEventDispatcher {}

export default class ExchangeChannelMediator extends AbstractMediator {
    private myProxy: ExchangeChannelProxy = <any>this.getProxy(ExchangeChannelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IExchangeChannel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_exchange_channel_table_columns,
            EventType.admin_exchange_channel_index,
            EventType.admin_exchange_channel_show,
            EventType.admin_exchange_channel_store,
            EventType.admin_exchange_channel_update,
            EventType.admin_exchange_channel_method_table_columns,
            EventType.admin_exchange_channel_method_show,
            EventType.admin_exchange_channel_method_store,
            EventType.admin_exchange_channel_method_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: ExchangeChannelProxy = <any>this.facade.retrieveProxy(ExchangeChannelProxy.NAME);
        const myView: IExchangeChannel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_exchange_channel_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_exchange_channel_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_exchange_channel_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_exchange_channel_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_channel_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_channel_method_table_columns:
                myProxy.setPayMethodTableColumns(body);
                break;
            case EventType.admin_exchange_channel_method_show:
                break;
            case EventType.admin_exchange_channel_method_store:
                Message.success(SuccessMessage.create);
                myProxy.hidePayMethodDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_channel_method_update:
                Message.success(SuccessMessage.update);
                myProxy.hidePayMethodDialog();
                myProxy.onQuery();
                break;
        }
    }
}
