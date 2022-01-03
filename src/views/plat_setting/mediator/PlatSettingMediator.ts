import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_setting/setting";
import { Message } from "element-ui";
import PlatSettingProxy from "../proxy/PlatSettingProxy";

interface IPlatSetting extends IEventDispatcher {}

export default class PlatSettingMediator extends AbstractMediator {
    private myProxy: PlatSettingProxy = <any>this.getProxy(PlatSettingProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatSetting = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [EventType.admin_plat_setting_table_columns, EventType.admin_plat_setting_show];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatSettingProxy = <any>this.facade.retrieveProxy(PlatSettingProxy.NAME);
        const myView: IPlatSetting = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_setting_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_setting_show:
                myProxy.setTableData(body);
                break;
        }
    }
}
