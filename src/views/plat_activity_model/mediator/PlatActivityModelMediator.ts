import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity_model/setting";
import { Message } from "element-ui";
import PlatActivityModelProxy from "../proxy/PlatActivityModelProxy";

interface IPlatActivityModel extends IEventDispatcher {}

export default class PlatActivityModelMediator extends AbstractMediator {
    private myProxy: PlatActivityModelProxy = <any>this.getProxy(PlatActivityModelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivityModel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_model_table_columns,
            EventType.admin_plat_activity_model_index,
            EventType.admin_plat_activity_model_store,
            EventType.admin_plat_activity_model_show,
            EventType.admin_plat_activity_model_update,
            EventType.admin_plat_activity_model_plat_table_columns,
            EventType.admin_plat_activity_model_plat_index,
            EventType.admin_plat_activity_model_plat_store,
            EventType.admin_plat_index,
            EventType.admin_plat_activity_rule_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityModelProxy = <any>this.facade.retrieveProxy(PlatActivityModelProxy.NAME);
        const myView: IPlatActivityModel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_model_table_columns:
                myProxy.setTableColumns(body);
                myProxy.onGetPlatData();
                break;
            case EventType.admin_plat_activity_model_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_activity_model_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_activity_model_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_activity_model_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_index:
                myProxy.setPlatList(body.list);
                break;
            case EventType.admin_plat_activity_model_plat_store:
                Message.success(SuccessMessage.update);
                myProxy.hidePlatSettingDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_activity_model_plat_index:
                myProxy.setPlatSetting(body);
                break;
            case EventType.admin_plat_activity_rule_index:
                myProxy.setActivityRuleList(body);
                break;
        }
    }
}
