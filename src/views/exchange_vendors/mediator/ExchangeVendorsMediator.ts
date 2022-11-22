import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/exchange_vendors/setting";
import { Message } from "element-ui";
import ExchangeVendorsProxy from "../proxy/ExchangeVendorsProxy";

interface IExchangeVendors extends IEventDispatcher {
    setTableColumns(payload: any): void;
    setTableList(payload: any): void;
    setTableListOne(payload: any): void;
    onCreateSuccess(): void;
    onUpdateSuccess(): void;
}

export default class ExchangeVendorsMediator extends AbstractMediator {
    private myProxy: ExchangeVendorsProxy = <any>this.getProxy(ExchangeVendorsProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IExchangeVendors = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_exchange_vendors_table_columns,
            EventType.admin_exchange_vendors_index,
            EventType.admin_exchange_vendors_show,
            EventType.admin_exchange_vendors_store,
            EventType.admin_exchange_vendors_update,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: ExchangeVendorsProxy = <any>this.facade.retrieveProxy(ExchangeVendorsProxy.NAME);
        const myView: IExchangeVendors = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_exchange_vendors_table_columns:
                myProxy.setTableCoulmns(body);
                break;
            case EventType.admin_exchange_vendors_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_exchange_vendors_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_exchange_vendors_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_vendors_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case GlobalEventType.REQUEST_ERROR:
                break;
        }
    }
}
