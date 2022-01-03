import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_blacklist/setting";
import { Message } from "element-ui";
import PlatBlacklistProxy from "../proxy/PlatBlacklistProxy";
import i18n from "@/lang";

interface IPlatBlacklist extends IEventDispatcher {}

export default class PlatBlacklistMediator extends AbstractMediator {
    private myProxy: PlatBlacklistProxy = <any>this.getProxy(PlatBlacklistProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatBlacklist = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_blacklist_table_columns,
            EventType.admin_plats_blacklist_index,
            EventType.admin_plats_blacklist_store,
            EventType.admin_plats_blacklist_update,
            EventType.admin_plats_blacklist_delete_batch,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatBlacklistProxy = <any>this.facade.retrieveProxy(PlatBlacklistProxy.NAME);
        const myView: IPlatBlacklist = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_blacklist_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_blacklist_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plats_blacklist_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plats_blacklist_update:
                Message.success(<any>i18n.t("successMessage.operation"));
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plats_blacklist_delete_batch:
                Message.success(<any>i18n.t("successMessage.operation"));
                myProxy.onQuery();
                break;
        }
    }
}
