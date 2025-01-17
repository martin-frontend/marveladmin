import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";
import { Message } from "element-ui";
import i18n from "@/lang";
export default class TabWalletMediator extends AbstractMediator {
    private myProxy: TabWalletProxy = <any>getProxy(TabWalletProxy);
    private pageSetting = getPageSetting();

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
            EventType.admin_plat_user_vendor_withdraw,
            // EventType.admin_plat_user_update_safe_gold,
            EventType.admin_plat_user_update_user_gold,
            EventType.admin_plat_user_recharge_address,
            EventType.admin_plat_user_transfer_user_gold,
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
                    this.myProxy.refreshing = false;
                    this.myProxy.setUserInfo(body);
                    break;
                case EventType.admin_plat_user_vendor_withdraw:
                    this.myProxy.getGoldInfo(this.myProxy.userInfo.user_id);
                    break;
                // case EventType.admin_plat_user_update_safe_gold:
                //     this.myProxy.getGoldInfo(this.myProxy.userInfo.user_id);
                //     break;
                case EventType.admin_plat_user_update_user_gold:
                    this.myProxy.dialogDeductGoldData.bShow = false;
                    this.myProxy.getGoldInfo(this.myProxy.userInfo.user_id);
                    break;
                case EventType.admin_plat_user_recharge_address:
                    this.myProxy.refreshing = false;
                    this.myProxy.dialogRechargeAddress.bShow = true;
                    this.myProxy.setRechargeAddress(body);
                    break;
                case EventType.admin_plat_user_transfer_user_gold:
                    Message.success(<any>LangUtil("操作成功"));
                    this.myProxy.dialogTransferData.bShow = false;
                    this.myProxy.getGoldInfo(this.myProxy.userInfo.user_id);
                    break;
            }
        }
    }
}
