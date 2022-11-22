import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { EventType, HttpType } from "@/views/_user_detail/setting";
import TabPlatVendorUserProxy from "../proxy/TabPlatVendorUserProxy";
import { getPageSetting, getProxy } from "@/views/_user_detail/PageSetting";
import { Message, MessageBox } from "element-ui";
import i18n from "@/lang";
import { convertToNum } from "@/core/global/Functions";

export default class TabPlatVendorUserMediator extends AbstractMediator {
    private myProxy: TabPlatVendorUserProxy = <any>getProxy(TabPlatVendorUserProxy);
    private pageSetting = getPageSetting();

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_vendor_user_table_columns,
            EventType.admin_plat_vendor_user_index,
            EventType.admin_plat_vendor_user_show,
            EventType.admin_plat_vendor_user_money,
            EventType.admin_plat_user_vendor_withdraw,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        if (this.pageSetting == getPageSetting()) {
            const body = notification.getBody();
            switch (notification.getName()) {
                case EventType.admin_plat_vendor_user_table_columns:
                    this.myProxy.setTableColumns(body);
                    this.myProxy.admin_plat_vendor_user_index();
                    break;
                case EventType.admin_plat_vendor_user_index:
                    this.myProxy.setTableData(body);
                    break;
                case EventType.admin_plat_vendor_user_show:
                    break;
                case EventType.admin_plat_vendor_user_money:
                    {
                        const msg = LangUtil("厂商余额") + "：" + body.gold;
                        if (convertToNum(body.gold) > 0) {
                            MessageBox.confirm(msg, "", {
                                confirmButtonText: <string>LangUtil("提取"),
                                cancelButtonText: <string>LangUtil("关闭"),
                            }).then(() => {
                                const data = {
                                    user_id: this.pageSetting.user_id,
                                    vendor_id: this.myProxy.select_vendor_id,
                                    coin_name_unique: this.myProxy.coin_name_unique,
                                };
                                this.sendNotification(HttpType.admin_plat_user_vendor_withdraw, data);
                            });
                        } else {
                            MessageBox.alert(msg, "", {
                                confirmButtonText: <string>LangUtil("关闭"),
                            });
                        }
                    }
                    break;
                case EventType.admin_plat_user_vendor_withdraw:
                    Message.success(<string>LangUtil("操作成功"));
                    break;
            }
        }
    }
}
