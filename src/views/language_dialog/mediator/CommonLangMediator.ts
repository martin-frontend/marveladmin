import AbstractMediator from "@/core/abstract/AbstractMediator";
import { DialogStatus, SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { Message } from "element-ui";
import CommonLangProxy from "../proxy/CommonLangProxy";
import { EventType } from "../setting";

interface IPlatLang extends IEventDispatcher {}

export default class CommonLangMediator extends AbstractMediator {
    private myProxy: CommonLangProxy = <any>this.getProxy(CommonLangProxy);

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
            EventType.admin_plat_lang_update,
            EventType.admin_system_lang_translate,
            EventType.admin_system_lang_check,
            EventType.admin_system_lang_store,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CommonLangProxy = <any>this.facade.retrieveProxy(CommonLangProxy.NAME);
        const myView: IPlatLang = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_lang_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_lang_store:
            case EventType.admin_system_lang_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                break;
            case EventType.admin_plat_lang_update:
            case EventType.admin_system_lang_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                break;
            case EventType.admin_system_lang_translate:
                Message.success(SuccessMessage.update);
                myProxy.updateForm(body);
                break;
            case EventType.admin_system_lang_check:
                //查询到数据库有数据，标记，保存的时候使用更新接口
                myProxy.dialogData.status = body.id != undefined ? DialogStatus.update : DialogStatus.create;
                myProxy.updateForm(body);
                break;
        }
    }
}
