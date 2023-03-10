import AbstractMediator from "@/core/abstract/AbstractMediator";
import { DialogStatus, SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { Message } from "element-ui";
import CommonLangTinymceProxy from "../proxy/CommonLangTinymceProxy";
import { EventType } from "../setting";

interface IPlatLang extends IEventDispatcher {}

export default class CommonLangTinymceMediator extends AbstractMediator {
    private myProxy: CommonLangTinymceProxy = <any>this.getProxy(CommonLangTinymceProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatLang = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_lang_table_columns,
            EventType.admin_plat_lang_store,
            EventType.admin_system_lang_store,
            EventType.admin_system_lang_check,
            EventType.admin_plat_lang_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CommonLangTinymceProxy = <any>this.facade.retrieveProxy(CommonLangTinymceProxy.NAME);
        const myView: IPlatLang = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_lang_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_lang_store:
            case EventType.admin_system_lang_store:
                // Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                break;
            case EventType.admin_system_lang_check:
                //查询到数据库有数据，标记，保存的时候使用更新接口
                myProxy.dialogData.status = body.id != undefined ? DialogStatus.update : DialogStatus.create;
                myProxy.updateForm(body);
                break;
            case EventType.admin_plat_lang_update:
                // Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                break;
        }
    }
}
