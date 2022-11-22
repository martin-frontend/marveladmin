import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity_award/setting";
import { Message } from "element-ui";
import PlatActivityAwardProxy from "../proxy/PlatActivityAwardProxy";
import i18n from "@/lang";

interface IPlatActivityAward extends IEventDispatcher {}

export default class PlatActivityAwardMediator extends AbstractMediator {
    private myProxy: PlatActivityAwardProxy = <any>this.getProxy(PlatActivityAwardProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivityAward = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_award_table_columns,
            EventType.admin_plat_activity_award_index,
            EventType.admin_plat_activity_award_show,
            EventType.admin_plat_activity_award_send_by_hand,
            EventType.admin_plat_index,
            GlobalEventType.REFRESH_PAGE,
            EventType.admin_plat_activity_award_cancel,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityAwardProxy = <any>this.facade.retrieveProxy(PlatActivityAwardProxy.NAME);
        const myView: IPlatActivityAward = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_award_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_activity_award_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_activity_award_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_activity_award_send_by_hand:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.onQuery();
                myProxy.hideDialog();
                break;
            case EventType.admin_plat_index:
                break;
            case GlobalEventType.REFRESH_PAGE:
                myProxy.onQuery();
                break;
            case EventType.admin_plat_activity_award_cancel:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.onQuery();
                myProxy.hideDialog();
                break;
        }
    }
}
