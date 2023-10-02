import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_currency_conversion_rate/setting";
import { Message } from "element-ui";
import PlatCurrencyConversionRateProxy from "../proxy/PlatCurrencyConversionRateProxy";

interface IPlatCurrencyConversionRate extends IEventDispatcher {

}

export default class PlatCurrencyConversionRateMediator extends AbstractMediator {
    private myProxy: PlatCurrencyConversionRateProxy = <any>this.getProxy(PlatCurrencyConversionRateProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatCurrencyConversionRate = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_currency_conversion_rate_table_columns,
            EventType.admin_plat_currency_conversion_rate_index,
            EventType.admin_plat_currency_conversion_rate_show,
            EventType.admin_plat_currency_conversion_rate_store,
            EventType.admin_plat_currency_conversion_rate_update,
            EventType.admin_plat_currency_conversion_rate_delete,
            EventType.admin_conversion_orders_show_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatCurrencyConversionRateProxy = <any>this.facade.retrieveProxy(PlatCurrencyConversionRateProxy.NAME);
        const myView: IPlatCurrencyConversionRate = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_currency_conversion_rate_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_currency_conversion_rate_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_currency_conversion_rate_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_currency_conversion_rate_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_currency_conversion_rate_delete:
            case EventType.admin_plat_currency_conversion_rate_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_conversion_orders_show_index:
                myProxy.setLog(body)
                break;
        }
    }
}
