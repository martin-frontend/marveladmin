import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity_rule/setting";
import { Message } from "element-ui";
import PlatActivityRuleProxy from "../proxy/PlatActivityRuleProxy";

interface IPlatActivityRule extends IEventDispatcher {}

export default class PlatActivityRuleMediator extends AbstractMediator {
    private myProxy: PlatActivityRuleProxy = <any>this.getProxy(PlatActivityRuleProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivityRule = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_rule_table_columns,
            EventType.admin_plat_activity_rule_index,
            EventType.admin_plat_activity_rule_store,
            EventType.admin_plat_activity_rule_show,
            EventType.admin_plat_activity_rule_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityRuleProxy = <any>this.facade.retrieveProxy(PlatActivityRuleProxy.NAME);
        const myView: IPlatActivityRule = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_rule_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_activity_rule_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_activity_rule_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_activity_rule_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_activity_rule_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
