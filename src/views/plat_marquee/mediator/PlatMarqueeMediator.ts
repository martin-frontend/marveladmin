import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_marquee/setting";
import { Message } from "element-ui";
import PlatMarqueeProxy from "../proxy/PlatMarqueeProxy";

interface IPlatMarquee extends IEventDispatcher {}

export default class PlatMarqueeMediator extends AbstractMediator {
    private myProxy: PlatMarqueeProxy = <any>this.getProxy(PlatMarqueeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatMarquee = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plats_marquee_table_columns,
            EventType.admin_plats_marquee_index,
            EventType.admin_plats_marquee_show,
            EventType.admin_plats_marquee_store,
            EventType.admin_plats_marquee_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatMarqueeProxy = <any>this.facade.retrieveProxy(PlatMarqueeProxy.NAME);
        const myView: IPlatMarquee = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plats_marquee_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plats_marquee_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plats_marquee_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plats_marquee_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plats_marquee_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
