import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { getUrl } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_agent/setting";
import { Message } from "element-ui";
import PlatAgentProxy from "../proxy/PlatAgentProxy";

interface IPlatAgent extends IEventDispatcher {}

export default class PlatAgentMediator extends AbstractMediator {
    private myProxy: PlatAgentProxy = <any>this.getProxy(PlatAgentProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatAgent = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            // EventType.admin_plat_table_columns,
            // EventType.admin_plat_index,
            EventType.admin_plat_show,
            EventType.admin_plat_update,
            EventType.admin_plat_agent_promotion_model_table_columns,
            EventType.admin_plat_agent_promotion_model_show,
            EventType.admin_resource_upload,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatAgentProxy = <any>this.facade.retrieveProxy(PlatAgentProxy.NAME);
        const myView: IPlatAgent = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_agent_promotion_model_table_columns:
                myProxy.setTableColumns(body);
                break;
            // case EventType.admin_plat_index:
            // myProxy.setTableData(body);
            // break;
            case EventType.admin_plat_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.hidePromotionDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_agent_promotion_model_show:
                myProxy.setPromotionModel(body);
                break;
            case EventType.admin_resource_upload:
                myProxy.onUploadSuccess(body);
                break;
            case GlobalEventType.REQUEST_ERROR:
                if (body.url == getUrl(HttpType.admin_plat_update, { plat_id: this.myProxy.listQuery.plat_id })) {
                    myProxy.onQuery();
                }
                break;
        }
    }
}
