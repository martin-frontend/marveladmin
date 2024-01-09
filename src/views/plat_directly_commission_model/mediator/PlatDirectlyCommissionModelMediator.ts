import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_directly_commission_model/setting";
import { Message } from "element-ui";
import PlatDirectlyCommissionModelProxy from "../proxy/PlatDirectlyCommissionModelProxy";

interface IPlatDirectlyCommissionModel extends IEventDispatcher {
    
}

export default class PlatDirectlyCommissionModelMediator extends AbstractMediator {
    private myProxy: PlatDirectlyCommissionModelProxy = <any>this.getProxy(PlatDirectlyCommissionModelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatDirectlyCommissionModel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_directly_commission_model_table_columns,
            EventType.admin_plat_directly_commission_model_index,
            EventType.admin_plat_directly_commission_model_show,
            EventType.admin_plat_directly_commission_model_store,
            EventType.admin_plat_directly_commission_model_update,
            EventType.admin_plat_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatDirectlyCommissionModelProxy = <any>this.facade.retrieveProxy(PlatDirectlyCommissionModelProxy.NAME);
        const myView: IPlatDirectlyCommissionModel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_directly_commission_model_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_directly_commission_model_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_directly_commission_model_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_directly_commission_model_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_directly_commission_model_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_update:
                break;
        }
    }
}
