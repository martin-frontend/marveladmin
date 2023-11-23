import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_coin_tasks/setting";
import { Message } from "element-ui";
import PlatCoinTasksProxy from "../proxy/PlatCoinTasksProxy";
import LangUtil from "@/core/global/LangUtil";

interface IPlatCoinTasks extends IEventDispatcher {

}

export default class PlatCoinTasksMediator extends AbstractMediator {
    private myProxy: PlatCoinTasksProxy = <any>this.getProxy(PlatCoinTasksProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatCoinTasks = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_coin_tasks_table_columns,
            EventType.admin_plat_coin_tasks_index,
            EventType.admin_plat_coin_tasks_store,
            EventType.admin_plat_coin_tasks_update,
            EventType.admin_plat_coin_tasks_batch_cancel,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatCoinTasksProxy = <any>this.facade.retrieveProxy(PlatCoinTasksProxy.NAME);
        const myView: IPlatCoinTasks = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_coin_tasks_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_coin_tasks_index:
                if (myProxy.exportData.isExportExcel) {
                    myProxy.onSaveExportData(body);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_coin_tasks_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_coin_tasks_update:
                Message.success(SuccessMessage.update);
                myProxy.onQuery();
                break;
            case EventType.admin_plat_coin_tasks_batch_cancel:
                Message.success(LangUtil("批量撤销成功"));
                myProxy.onQuery();
                break;
        }
    }
}
