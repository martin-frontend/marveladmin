import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabEasybetProxy from "../proxy/TabEasybetProxy";
import { getProxy, getPageSetting } from "@/views/_user_detail/PageSetting";
import { Message } from "element-ui";
import { SuccessMessage } from "@/core/global/Constant";

export default class TabEasybetMediator extends AbstractMediator {
    private myProxy: TabEasybetProxy = <any>getProxy(TabEasybetProxy);
    pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_update_user_level,
            EventType.admin_plat_user_table_columns,
            EventType.admin_plat_user_show,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_user_table_columns:
                    this.myProxy.setTableColumns(body);
                    break;
                case EventType.admin_plat_user_show:
                    this.myProxy.setUserInfo(body);
                    break;
                case EventType.admin_plat_user_update_user_level:
                    Message.success(SuccessMessage.update);
                    this.myProxy.hideDialog();
                    this.myProxy.getUserDetail(getPageSetting().user_id);
                    break;
            }
        }
    }
}
