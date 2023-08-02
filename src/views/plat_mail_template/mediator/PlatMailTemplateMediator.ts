import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_mail_template/setting";
import { Message } from "element-ui";
import PlatMailTemplateProxy from "../proxy/PlatMailTemplateProxy";

interface IPlatMailTemplate extends IEventDispatcher {
    
}

export default class PlatMailTemplateMediator extends AbstractMediator {
    private myProxy: PlatMailTemplateProxy = <any>this.getProxy(PlatMailTemplateProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatMailTemplate = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_mail_template_table_columns,
            EventType.admin_plat_mail_template_index,
            EventType.admin_plat_mail_template_show,
            EventType.admin_plat_mail_template_store,
            EventType.admin_plat_mail_template_update,
            EventType.admin_plat_mail_template_delete,

        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatMailTemplateProxy = <any>this.facade.retrieveProxy(PlatMailTemplateProxy.NAME);
        const myView: IPlatMailTemplate = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_mail_template_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_mail_template_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_mail_template_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_mail_template_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_mail_template_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            // case EventType.admin_plat_mail_template_table_columns:
            //     break;
            // case EventType.admin_plat_mail_template_index:
            //     break;
            // case EventType.admin_plat_mail_template_show:
            //     break;
            // case EventType.admin_plat_mail_template_store:
            //     break;
            // case EventType.admin_plat_mail_template_update:
            //     break;
            case EventType.admin_plat_mail_template_delete:
                myProxy.onQuery();
                break;

        }
    }
}
