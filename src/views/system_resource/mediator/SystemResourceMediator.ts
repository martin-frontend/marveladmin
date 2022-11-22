import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/system_resource/setting";
import { Message } from "element-ui";
import SystemResourceProxy from "../proxy/SystemResourceProxy";
import i18n from "@/lang";

interface ISystemResource extends IEventDispatcher {}

export default class SystemResourceMediator extends AbstractMediator {
    private myProxy: SystemResourceProxy = <any>this.getProxy(SystemResourceProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ISystemResource = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_system_resource_table_columns,
            EventType.admin_system_resource_index,
            EventType.admin_system_resource_store,
            EventType.admin_system_resource_update,
            EventType.admin_resource_upload,
        ];
    }
    private uploadSuccess: any = LangUtil("图片上传成功");
    private deleteSuccess: any = LangUtil("图片删除成功");
    handleNotification(notification: puremvc.INotification) {
        const myProxy: SystemResourceProxy = <any>this.facade.retrieveProxy(SystemResourceProxy.NAME);
        const myView: ISystemResource = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_system_resource_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_system_resource_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_system_resource_store: {
                if (myProxy.imgBatchDialogData.fileList.length > 0) {
                    myProxy.onBatchUpload();
                    return;
                }

                Message.success(this.uploadSuccess);
                myProxy.hideDialog();
                myProxy.hideBatchDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            }
            case EventType.admin_system_resource_update:
                if (myProxy.imgBatchDialogData.deleteItems.length > 0) {
                    myProxy.onBatchDelete();
                    return;
                }

                Message.success(this.deleteSuccess);
                myProxy.hideBatchDialog();
                myProxy.onQuery();
                break;
        }
    }
}
