import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/exchange_orders/setting";
import { Message } from "element-ui";
import ExchangeOrdersProxy from "../proxy/ExchangeOrdersProxy";
import ExchangeAutoCheckProxy from "../proxy/ExchangeAutoCheckProxy";
import i18n from "@/lang";

interface IExchangeOrders extends IEventDispatcher { }

export default class ExchangeOrdersMediator extends AbstractMediator {
    private myProxy: ExchangeOrdersProxy = <any>this.getProxy(ExchangeOrdersProxy);
    private autoProxy: ExchangeAutoCheckProxy = <any>this.getProxy(ExchangeAutoCheckProxy);

    onRegister() {
        this.myProxy.enter();
        this.autoProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IExchangeOrders = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_exchange_orders_table_columns,
            EventType.admin_exchange_orders_index,
            EventType.admin_exchange_orders_approved,
            EventType.admin_exchange_orders_close_order_return_gold,
            EventType.admin_exchange_orders_close_order,
            EventType.admin_exchange_orders_finish_order,
            EventType.admin_exchange_orders_update_channel,
            EventType.admin_exchange_auto_check_setting_table_columns,
            EventType.admin_exchange_auto_check_setting_show,
            EventType.admin_exchange_auto_check_setting_store,
            EventType.admin_exchange_auto_check_setting_update,
            EventType.admin_exchange_orders_rush,
            EventType.admin_exchange_orders_update_remark,
            EventType.admin_exchange_orders_dispatch,
            EventType.admin_exchange_orders_dispatch_cancel,
            EventType.admin_exchange_orders_manual_refund,
            EventType.admin_exchange_orders_batch_accept,
            EventType.admin_exchange_orders_batch_cancel_accept,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: ExchangeOrdersProxy = <any>this.facade.retrieveProxy(ExchangeOrdersProxy.NAME);
        const autoProxy: ExchangeAutoCheckProxy = <any>this.facade.retrieveProxy(ExchangeAutoCheckProxy.NAME);
        const myView: IExchangeOrders = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_exchange_orders_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_exchange_orders_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_exchange_orders_approved:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_close_order_return_gold:
                Message.success(SuccessMessage.update);
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_close_order:
                Message.success(SuccessMessage.update);
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_finish_order:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_update_channel:
                myProxy.changeDialogData.bShow = false;
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_auto_check_setting_table_columns:
                autoProxy.setTableColumns(body);
                break;
            case EventType.admin_exchange_auto_check_setting_show:
                autoProxy.setVerify(body);
                break;
            case EventType.admin_exchange_auto_check_setting_store:
                Message.success(<any>LangUtil("操作成功"));
                autoProxy.hideDialog();
                autoProxy.checkVerify();
                break;
            case EventType.admin_exchange_auto_check_setting_update:
                Message.success(<any>LangUtil("操作成功"));
                autoProxy.hideDialog();
                autoProxy.checkVerify();
                break;
            case EventType.admin_exchange_orders_rush:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_update_remark:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_dispatch:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideDispatchDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_dispatch_cancel:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideDispatchDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_manual_refund:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideRemarkDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_batch_accept:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.onQuery();
                break;
            case EventType.admin_exchange_orders_batch_cancel_accept:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.onQuery();
                break;
        }
    }
}
