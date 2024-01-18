import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_profit_tax/setting";
import { Message } from "element-ui";
import PlatProfitTaxProxy from "../proxy/PlatProfitTaxProxy";

interface IPlatProfitTax extends IEventDispatcher {

}

export default class PlatProfitTaxMediator extends AbstractMediator {
    private myProxy: PlatProfitTaxProxy = <any>this.getProxy(PlatProfitTaxProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatProfitTax = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_profit_tax_table_columns,
            EventType.admin_plat_profit_tax_index,
            EventType.admin_plat_profit_tax_show,
            EventType.admin_plat_profit_tax_store,
            EventType.admin_plat_profit_tax_update,
            EventType.admin_plat_profit_tax_delete,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatProfitTaxProxy = <any>this.facade.retrieveProxy(PlatProfitTaxProxy.NAME);
        const myView: IPlatProfitTax = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_profit_tax_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_profit_tax_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_profit_tax_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_profit_tax_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_profit_tax_delete:
            case EventType.admin_plat_profit_tax_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
