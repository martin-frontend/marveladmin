import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/admin_cron/setting";
import { Message } from "element-ui";
import AdminCronProxy from "../proxy/AdminCronProxy";

interface IAdminCron extends IEventDispatcher {}

export default class AdminCronMediator extends AbstractMediator {
    private myProxy: AdminCronProxy = <any>this.getProxy(AdminCronProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IAdminCron = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_admin_cron_table_columns,
            EventType.admin_admin_cron_index,
            EventType.admin_admin_cron_queue_show,
            EventType.admin_admin_cron_store,
            EventType.admin_admin_cron_update,
            EventType.admin_admin_cron_queue_table_columns,
            EventType.admin_admin_cron_queue_index,
            EventType.admin_admin_cron_queue_update,
            EventType.admin_admin_cron_queue_update_batch,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: AdminCronProxy = <any>this.facade.retrieveProxy(AdminCronProxy.NAME);
        const myView: IAdminCron = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_admin_cron_table_columns:
                myProxy.setCronTableColumns(body);
                break;
            case EventType.admin_admin_cron_index:
                myProxy.setCronTableData(body);
                break;
            case EventType.admin_admin_cron_queue_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_admin_cron_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.cronListQuery.page_count = 1;
                myProxy.onQueryCron();
                break;
            case EventType.admin_admin_cron_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQueryCron();
                break;
            case EventType.admin_admin_cron_queue_table_columns:
                myProxy.setCronQueueCronTableColumns(body);
                break;
            case EventType.admin_admin_cron_queue_index:
                myProxy.setCronQueueTableData(body);
                break;
            case EventType.admin_admin_cron_queue_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQueryCronQueue();
                break;
            case EventType.admin_admin_cron_queue_update_batch:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQueryCronQueue();
                break;
        }
    }
}
