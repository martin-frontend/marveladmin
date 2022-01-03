import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity/setting";
import { Message } from "element-ui";
import PlatActivityProxy from "../proxy/PlatActivityProxy";

interface IPlatActivity extends IEventDispatcher {}

export default class PlatActivityMediator extends AbstractMediator {
    private myProxy: PlatActivityProxy = <any>this.getProxy(PlatActivityProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivity = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_table_columns,
            EventType.admin_plat_activity_index,
            EventType.admin_plat_activity_store,
            EventType.admin_plat_activity_show,
            EventType.admin_plat_activity_update,
            EventType.admin_plat_index,
            EventType.admin_plat_activity_model_index,
            EventType.admin_plat_activity_rule_index,
            EventType.admin_plat_activity_model_show,
            EventType.admin_resource_upload,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityProxy = <any>this.facade.retrieveProxy(PlatActivityProxy.NAME);
        const myView: IPlatActivity = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_activity_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_activity_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_activity_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_activity_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_index:
                break;
            case EventType.admin_plat_activity_model_index:
                myProxy.setActivityModelList(body);
                break;
            case EventType.admin_plat_activity_rule_index:
                myProxy.setActivityRuleList(body);
                break;
            case EventType.admin_plat_activity_model_show:
                myProxy.setModelDetail(body);
                break;
            case EventType.admin_resource_upload:
                myProxy.uploadSuccess(body);
                break;
        }
    }
}
