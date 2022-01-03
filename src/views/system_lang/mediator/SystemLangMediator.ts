import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/system_lang/setting";
import { Message } from "element-ui";
import SystemLangProxy from "../proxy/SystemLangProxy";

interface ISystemLang extends IEventDispatcher {}

export default class SystemLangMediator extends AbstractMediator {
    private myProxy: SystemLangProxy = <any>this.getProxy(SystemLangProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ISystemLang = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_system_lang_table_columns,
            EventType.admin_system_lang_index,
            EventType.admin_system_lang_store,
            EventType.admin_system_lang_update,
            EventType.admin_system_lang_delete,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: SystemLangProxy = <any>this.facade.retrieveProxy(SystemLangProxy.NAME);
        const myView: ISystemLang = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_system_lang_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_system_lang_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.exportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_system_lang_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_system_lang_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_system_lang_delete:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
