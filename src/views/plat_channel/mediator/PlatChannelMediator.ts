import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_channel/setting";
import { Message } from "element-ui";
import PlatChannelProxy from "../proxy/PlatChannelProxy";

interface IPlatChannel extends IEventDispatcher {}

export default class PlatChannelMediator extends AbstractMediator {
    private myProxy: PlatChannelProxy = <any>this.getProxy(PlatChannelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatChannel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_channel_table_columns,
            EventType.admin_plat_channel_index,
            EventType.admin_plat_channel_store,
            EventType.admin_plat_channel_show,
            EventType.admin_plat_channel_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatChannelProxy = <any>this.facade.retrieveProxy(PlatChannelProxy.NAME);
        const myView: IPlatChannel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_channel_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_channel_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_channel_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_channel_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
