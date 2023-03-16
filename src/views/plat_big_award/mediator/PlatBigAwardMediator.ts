import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_big_award/setting";
import { Message } from "element-ui";
import PlatBigAwardProxy from "../proxy/PlatBigAwardProxy";

interface IPlatBigAward extends IEventDispatcher {}

export default class PlatBigAwardMediator extends AbstractMediator {
    private myProxy: PlatBigAwardProxy = <any>this.getProxy(PlatBigAwardProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatBigAward = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_big_award_table_columns,
            EventType.admin_plat_big_award_index,
            EventType.admin_plat_big_award_show,
            EventType.admin_plat_big_award_store,
            EventType.admin_plat_big_award_update,
            EventType.admin_resource_upload,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatBigAwardProxy = <any>this.facade.retrieveProxy(PlatBigAwardProxy.NAME);
        const myView: IPlatBigAward = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_big_award_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_big_award_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_big_award_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_big_award_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_big_award_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_resource_upload:
                myProxy.uploadSuccess(body);
                break;
        }
    }
}
