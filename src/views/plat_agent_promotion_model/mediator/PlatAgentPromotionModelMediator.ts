import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_agent_promotion_model/setting";
import { Message } from "element-ui";
import PlatAgentPromotionModelProxy from "../proxy/PlatAgentPromotionModelProxy";

interface IPlatAgentPromotionModel extends IEventDispatcher {}

export default class PlatAgentPromotionModelMediator extends AbstractMediator {
    private myProxy: PlatAgentPromotionModelProxy = <any>this.getProxy(PlatAgentPromotionModelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAgentPromotionModel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_agent_promotion_model_table_columns,
            EventType.admin_plat_agent_promotion_model_index,
            EventType.admin_plat_agent_promotion_model_show,
            EventType.admin_plat_agent_promotion_model_store,
            EventType.admin_plat_agent_promotion_model_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAgentPromotionModelProxy = <any>this.facade.retrieveProxy(PlatAgentPromotionModelProxy.NAME);
        const myView: IPlatAgentPromotionModel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_agent_promotion_model_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_agent_promotion_model_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_agent_promotion_model_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_agent_promotion_model_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_agent_promotion_model_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
