import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_lang/setting";
import { Message } from "element-ui";
import PlatLangProxy from "../proxy/PlatLangProxy";

interface IPlatLang extends IEventDispatcher {}

export default class PlatLangMediator extends AbstractMediator {
    private myProxy: PlatLangProxy = <any>this.getProxy(PlatLangProxy);

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
            EventType.admin_plat_lang_index,
            EventType.admin_plat_lang_store,
            EventType.admin_plat_lang_update,
            EventType.admin_plat_lang_delete,
            EventType.admin_plat_lang_import,
            EventType.admin_system_lang_translate,
            EventType.admin_plat_lang_generate,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatLangProxy = <any>this.facade.retrieveProxy(PlatLangProxy.NAME);
        const myView: IPlatLang = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_lang_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_lang_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_lang_store:
                // Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_lang_update:
                // Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_lang_delete:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_lang_import:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_system_lang_translate:
                Message.success(SuccessMessage.update);
                myProxy.updateForm(body);
                break;
            case EventType.admin_plat_lang_generate:
                Message.success(SuccessMessage.update);
                break;
        }
    }
}
