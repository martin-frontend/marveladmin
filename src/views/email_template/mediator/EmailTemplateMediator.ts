import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/email_template/setting";
import { Message } from "element-ui";
import EmailTemplateProxy from "../proxy/EmailTemplateProxy";

interface IEmailTemplate extends IEventDispatcher {}

export default class EmailTemplateMediator extends AbstractMediator {
    private myProxy: EmailTemplateProxy = <any>this.getProxy(EmailTemplateProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IEmailTemplate = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_email_template_table_columns,
            EventType.admin_email_template_index,
            EventType.admin_email_template_show,
            EventType.admin_email_template_store,
            EventType.admin_email_template_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myView: IEmailTemplate = this.viewComponent;
        const body = notification.getBody();
        const myProxy: EmailTemplateProxy = <any>this.facade.retrieveProxy(EmailTemplateProxy.NAME);
        switch (notification.getName()) {
            case EventType.admin_email_template_table_columns:
                myProxy.setTableCoulmns(body);
                break;
            case EventType.admin_email_template_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_email_template_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_email_template_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_email_template_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
