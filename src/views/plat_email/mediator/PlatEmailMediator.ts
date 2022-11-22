import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import GlobalEventType from "@/core/global/GlobalEventType";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_email/setting";
import { Message } from "element-ui";
import PlatEmailProxy from "../proxy/PlatEmailProxy";

interface IPlatEmail extends IEventDispatcher {}

export default class PlatEmailMediator extends AbstractMediator {
    private myProxy: PlatEmailProxy = <any>this.getProxy(PlatEmailProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatEmail = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_mail_content_table_columns,
            EventType.admin_plat_mail_content_index,
            EventType.admin_plat_mail_content_show,
            EventType.admin_plat_mail_content_store,
            EventType.admin_plat_email_store_attachment_store,
            EventType.admin_plat_mail_content_update,
            EventType.admin_plat_users_mail_table_columns,
            EventType.admin_plat_users_mail_index,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatEmailProxy = <any>this.facade.retrieveProxy(PlatEmailProxy.NAME);
        const myView: IPlatEmail = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_mail_content_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_mail_content_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_mail_content_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_mail_content_store:
            case EventType.admin_plat_email_store_attachment_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_mail_content_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_mail_table_columns:
                this.myProxy.setPlatUserTableColumns(body);
                break;
            case EventType.admin_plat_users_mail_index:
                if (myProxy.platUserTableData.isExportExcel) {
                    myProxy.onExportExcel(body);
                } else {
                    myProxy.setUserTableData(body);
                }
                break;
            case GlobalEventType.REQUEST_ERROR:
                if (body.url.toString() == HttpType.admin_plat_mail_content_store) {
                    myProxy.showAlertDialog(body.result.msg);
                }
                break;
        }
    }
}
