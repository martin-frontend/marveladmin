import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_activity_rank/setting";
import { Message } from "element-ui";
import PlatActivityRankProxy from "../proxy/PlatActivityRankProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

interface IPlatActivityRank extends IEventDispatcher {

}

export default class PlatActivityRankMediator extends AbstractMediator {
    private myProxy: PlatActivityRankProxy = <any>this.getProxy(PlatActivityRankProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatActivityRank = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_activity_rank_list_table_columns,
            EventType.admin_plat_activity_rank_list_index,
            EventType.admin_plat_activity_rank_list_update,
            EventType.admin_plat_activity_rank_list_user_table_columns,
            EventType.admin_plat_activity_rank_list_user_index,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatActivityRankProxy = <any>this.facade.retrieveProxy(PlatActivityRankProxy.NAME);
        const myView: IPlatActivityRank = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_activity_rank_list_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_activity_rank_list_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_activity_rank_list_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_activity_rank_list_user_table_columns:
                myProxy.setUserTableColumns(body);
                break;
            case EventType.admin_plat_activity_rank_list_user_index:
                myProxy.setUserTableData(body);
                break;
            case GlobalEventType.REQUEST_ERROR:
                myProxy.onQuery();
                break;
        }
    }
}
