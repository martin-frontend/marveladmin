import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabCreditProxy from "../proxy/TabCreditProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";
import { Message, MessageBox } from "element-ui";
import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class TabCreditMediator extends AbstractMediator {
    myProxy: TabCreditProxy = <any>getProxy(TabCreditProxy);
    pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_table_columns,
            EventType.admin_plat_user_direct_users,
            EventType.admin_plat_users_credit_log_table_columns,
            EventType.admin_plat_users_credit_log_index,
            EventType.admin_plat_user_update,
            EventType.admin_plat_user_show,
            EventType.admin_plat_user_agent_bind_show,
            GlobalEventType.REQUEST_ERROR,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_user_table_columns:
                    this.myProxy.setTableColumns(body);
                    break;
                case EventType.admin_plat_user_direct_users:
                    this.myProxy.setTableData(body);
                    break;
                case EventType.admin_plat_users_credit_log_table_columns:
                    this.myProxy.setLogTableData(body);
                    break;
                case EventType.admin_plat_users_credit_log_index:
                    this.myProxy.setLogData(body);
                    break;
                case EventType.admin_plat_user_update:
                    Message.success(<any>LangUtil("修改成功"));
                    if (this.myProxy.dialogData.filed == "credit_rate_invited") {
                        this.myProxy.onQuery();
                    } else {
                        this.myProxy.getUserDetail(body);
                    }
                    this.myProxy.dialogData.filed = "";
                    this.myProxy.hideDialog();
                    break;
                case EventType.admin_plat_user_show:
                    this.myProxy.setUserInfo(body);
                    break;
                case EventType.admin_plat_user_agent_bind_show:
                    this.myProxy.setRelationChain(body);
                    break;
                case GlobalEventType.REQUEST_ERROR:
                    this.myProxy.getUserDetail(this.myProxy.userInfo.user_id);
                    break;
            }
        }
    }
}
