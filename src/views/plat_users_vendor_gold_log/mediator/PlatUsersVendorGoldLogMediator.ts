import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_users_vendor_gold_log/setting";
import { Message, MessageBox } from "element-ui";
import PlatUsersVendorGoldLogProxy from "../proxy/PlatUsersVendorGoldLogProxy";
import i18n from "@/lang";

interface IPlatUsersVendorGoldLog extends IEventDispatcher {}

export default class PlatUsersVendorGoldLogMediator extends AbstractMediator {
    private myProxy: PlatUsersVendorGoldLogProxy = <any>this.getProxy(PlatUsersVendorGoldLogProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUsersVendorGoldLog = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_vendor_gold_log_table_columns,
            EventType.admin_plat_users_vendor_gold_log_index,
            EventType.admin_plat_users_vendor_gold_log_show,
            EventType.admin_plat_users_vendor_gold_log_update_manual,
            EventType.admin_plat_users_vendor_gold_log_auto_check,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUsersVendorGoldLogProxy = <any>this.facade.retrieveProxy(PlatUsersVendorGoldLogProxy.NAME);
        const myView: IPlatUsersVendorGoldLog = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_vendor_gold_log_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_vendor_gold_log_index:
                if (myProxy.tableData.isExportExcel) {
                    myProxy.onExportExcel(body);
                } else {
                    myProxy.setTableData(body);
                }

                break;
            case EventType.admin_plat_users_vendor_gold_log_show:
                break;
            case EventType.admin_plat_users_vendor_gold_log_update_manual:
                Message.success(<any>i18n.t("successMessage.operation"));
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_vendor_gold_log_auto_check:
                myProxy.onQuery();
                MessageBox.alert(
                    body.error,
                    <string>(
                        i18n.t(
                            [
                                "plat_users_vendor_gold_log.tradeSuccess",
                                "plat_users_vendor_gold_log.tradeUnknown",
                                "plat_users_vendor_gold_log.tradeFail",
                            ][body.status]
                        )
                    )
                );
                break;
        }
    }
}
