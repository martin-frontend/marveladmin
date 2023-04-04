import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/statistic_agent_credit/setting";
import { Message } from "element-ui";
import CreditDividendPeriodProxy from "../proxy/CreditDividendPeriodProxy";

interface ICreditDividendPeriod extends IEventDispatcher {

}

export default class CreditDividendPeriodMediator extends AbstractMediator {
    private myProxy: CreditDividendPeriodProxy = <any>this.getProxy(CreditDividendPeriodProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICreditDividendPeriod = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_credit_dividend_period_table_columns,
            EventType.admin_credit_dividend_period_index,
            EventType.admin_credit_dividend_period_show,
            EventType.admin_credit_dividend_period_store,
            EventType.admin_credit_dividend_period_update,
            EventType.admin_credit_dividend_period_delete,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CreditDividendPeriodProxy = <any>this.facade.retrieveProxy(CreditDividendPeriodProxy.NAME);
        const myView: ICreditDividendPeriod = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_credit_dividend_period_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_credit_dividend_period_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_credit_dividend_period_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_credit_dividend_period_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_credit_dividend_period_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_credit_dividend_period_delete:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
