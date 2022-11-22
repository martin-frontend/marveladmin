import AbstractMediator from "@/core/abstract/AbstractMediator";
import { DialogStatus, SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { Message } from "element-ui";
import CommonLangImgProxy from "../proxy/CommonLangImgProxy";
import { EventType } from "../setting";

interface IPlatLang extends IEventDispatcher {}

export default class CommonLangImgMediator extends AbstractMediator {
    private myProxy: CommonLangImgProxy = <any>this.getProxy(CommonLangImgProxy);

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
            EventType.admin_system_lang_image_table_columns,
            EventType.admin_system_lang_image_store,
            EventType.admin_system_lang_image_update,
            EventType.admin_system_lang_image_show_key,
            EventType.admin_resource_lang_upload,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CommonLangImgProxy = <any>this.facade.retrieveProxy(CommonLangImgProxy.NAME);
        const myView: IPlatLang = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_system_lang_image_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_system_lang_image_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                break;
            case EventType.admin_system_lang_image_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                break;
            case EventType.admin_system_lang_image_show_key:
                //查询到数据库有数据，标记，保存的时候使用更新接口
                myProxy.dialogData.status = DialogStatus.update;
                myProxy.updateForm(body);
                break;
            case EventType.admin_resource_lang_upload:
                myProxy.setImageUrl(body);
                break;
        }
    }
}
