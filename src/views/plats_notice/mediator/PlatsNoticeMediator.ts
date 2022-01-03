import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plats_notice/setting";
import { Message } from "element-ui";
import PlatsNoticeProxy from "../proxy/PlatsNoticeProxy";

interface IPlatsNotice extends IEventDispatcher {}

export default class PlatsNoticeMediator extends AbstractMediator {
    private myProxy: PlatsNoticeProxy = <any>this.getProxy(PlatsNoticeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatsNotice = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_notice_table_columns,
            EventType.admin_plats_notice_index,
            EventType.admin_plats_notice_store,
            EventType.admin_plats_notice_update,
            EventType.admin_plats_notice_show,
            EventType.admin_resource_upload,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatsNoticeProxy = <any>this.facade.retrieveProxy(PlatsNoticeProxy.NAME);
        const myView: IPlatsNotice = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_notice_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_notice_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plats_notice_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plats_notice_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plats_notice_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_resource_upload:
                myProxy.setImageUrl(body);
                break;
        }
    }
}
