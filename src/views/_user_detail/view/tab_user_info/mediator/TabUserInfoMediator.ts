import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabUserInfoProxy from "../proxy/TabUserInfoProxy";
import { getProxy, getPageSetting } from "@/views/_user_detail/PageSetting";
import { Message, MessageBox } from "element-ui";
import GlobalEventType from "@/core/global/GlobalEventType";
import i18n from "@/lang";

export default class TabUserUnfoMediator extends AbstractMediator {
    myProxy: TabUserInfoProxy = <any>getProxy(TabUserInfoProxy);
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
            EventType.admin_plat_user_show,
            EventType.admin_plat_user_update,
            EventType.admin_plat_user_phone,
            EventType.admin_plat_user_email,
            EventType.admin_plat_user_agent_bind_show,
            EventType.admin_plat_user_update_level_exp,
            EventType.admin_plat_user_clear_cache,
            GlobalEventType.REFRESH_PAGE,
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
                case EventType.admin_plat_user_show:
                    this.myProxy.setUserInfo(body);
                    break;
                case EventType.admin_plat_user_update:
                    this.myProxy.getUserDetail(body);
                    if (this.myProxy.dialogData.filed != "") {
                        // @ts-ignore
                        Message.success(
                            `${this.myProxy.tableColumns[this.myProxy.dialogData.filed].name}` +
                                <any>LangUtil("修改成功")
                        );
                    } else {
                        // 清除谷歌验证码
                        Message.success(<any>LangUtil("操作成功"));
                    }
                    this.myProxy.dialogData.filed = "";
                    this.sendNotification(GlobalEventType.REFRESH_PAGE);
                    this.myProxy.hideDialog();
                    break;
                case EventType.admin_plat_user_phone:
                case EventType.admin_plat_user_email:
                    MessageBox.alert(<any>LangUtil("操作成功") + ":" + body);
                    break;
                case EventType.admin_plat_user_agent_bind_show:
                    this.myProxy.setRelationChain(body);
                    break;
                case EventType.admin_plat_user_update_level_exp:
                    Message.success(
                        `${this.myProxy.tableColumns[this.myProxy.dialogData.filed].name}` + <any>LangUtil("修改成功")
                    );
                    this.sendNotification(GlobalEventType.REFRESH_PAGE);
                    this.myProxy.hideDialog();
                    break;
                case EventType.admin_plat_user_clear_cache:
                    Message.success(<any>LangUtil("操作成功"));
                    break;
                case GlobalEventType.REFRESH_PAGE:
                    this.myProxy.getUserDetail(getPageSetting().user_id);
                    break;
                case GlobalEventType.REQUEST_ERROR:
                    this.myProxy.getUserDetail(this.myProxy.userInfo.user_id);
                    break;
            }
        }
    }
}
