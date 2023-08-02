import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/country/setting";
import { Message } from "element-ui";
import CountryProxy from "../proxy/CountryProxy";

interface ICountry extends IEventDispatcher {
    
}

export default class CountryMediator extends AbstractMediator {
    private myProxy: CountryProxy = <any>this.getProxy(CountryProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICountry = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_country_table_columns,
            EventType.admin_country_index,
            EventType.admin_country_show,
            EventType.admin_country_store,
            EventType.admin_country_update,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CountryProxy = <any>this.facade.retrieveProxy(CountryProxy.NAME);
        const myView: ICountry = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_country_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_country_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_country_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_country_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_country_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;

        }
    }
}
