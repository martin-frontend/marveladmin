import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user/setting";
import { Message, MessageBox } from "element-ui";
import LangUtil from "@/core/global/LangUtil";
import PlatUserProxy from "../proxy/PlatUserProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

interface IPlatUser extends IEventDispatcher {}

export default class PlatUserMediator extends AbstractMediator {
    myProxy: PlatUserProxy = <any>this.getProxy(PlatUserProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatUser = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_user_table_columns,
            EventType.admin_plat_user_index,
            EventType.admin_plat_user_store,
            EventType.admin_plat_user_show,
            EventType.admin_plat_user_update,
            EventType.admin_plat_user_vendor_withdraw,
            EventType.admin_plat_user_update_safe_gold,
            EventType.admin_plat_user_update_user_gold,
            EventType.admin_plat_users_wallet_show_plat,
            EventType.admin_plat_user_backwater_config,
            EventType.admin_plat_user_store_credit_user,
            EventType.admin_plat_user_change_channel,
            EventType.admin_plat_user_index2,
            EventType.admin_plat_user_update_admin_added_user,
            EventType.admin_plat_user_store_user_by_admin,
            EventType.admin_plat_user_get_admin_added_user,
            EventType.admin_plat_user_delete_admin_added_user,
            EventType.admin_plat_user_batch_update_tag,
            GlobalEventType.REFRESH_PAGE,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        // const myProxy: PlatUserProxy = <any>this.facade.retrieveProxy(PlatUserProxy.NAME);
        const myView: IPlatUser = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_table_columns:
                this.myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_index:
            case EventType.admin_plat_user_index2:
                this.myProxy.exportData.isSearch = true;
                if (this.myProxy.exportData.stop) {
                    this.myProxy.exportData.stop = false;
                } else {
                    if (this.myProxy.exportData.isExportExcel) {
                        this.myProxy.onSaveExportData(body);
                    } else {
                        this.myProxy.setTableData(body);
                    }
                }
                break;
            case EventType.admin_plat_user_show:
                this.myProxy.setDetail(body);
                break;
            case EventType.admin_plat_user_store:
                Message.success(SuccessMessage.create);
                this.myProxy.hideDialog();
                this.myProxy.listQuery.page_count = 1;
                this.myProxy.onQuery();
                break;
            case EventType.admin_plat_user_update:
            case EventType.admin_plat_user_batch_update_tag:
                Message.success(SuccessMessage.update);
                this.myProxy.hideDialog();
                this.myProxy.onQuery();
                break;
            case EventType.admin_plat_user_vendor_withdraw:
                break;
            case EventType.admin_plat_user_update_safe_gold:
                break;
            case EventType.admin_plat_user_update_user_gold:
                this.myProxy.hideDialog();
                this.myProxy.onQuery();
                break;
            case EventType.admin_plat_users_wallet_show_plat:
                this.myProxy.setWallet(body);
                break;
            case EventType.admin_plat_user_backwater_config:
                this.myProxy.setPlatUserBackwaterConfig(body);
                break;
            case EventType.admin_plat_user_get_admin_added_user:
                // this.myProxy.setMutipleUserDialogTableData(body);
                if (this.myProxy.addMutipleUserData.isExportExcel) {
                    this.myProxy.exportExcel_multiple(body);
                } else {
                    this.myProxy.setMutipleUserDialogTableData(body);
                }

                break;
            case EventType.admin_plat_user_store_user_by_admin:
                this.myProxy.setPlatAddMultipleUserConfig();
                break;
            case EventType.admin_plat_user_store_credit_user:
                MessageBox.confirm(
                    <string>(
                        LangUtil(
                            "添加账户成功，帐号{0}，密码{1}",
                            this.myProxy.creditUserDialogData.form.username,
                            this.myProxy.creditUserDialogData.form.password
                        )
                    ),
                    <string>LangUtil("提示"),
                    {
                        confirmButtonText: <string>LangUtil("确定"),
                        showCancelButton: false,
                        type: "warning",
                        center: true,
                    }
                ).then(() => {
                    this.myProxy.hideDialog();
                    this.myProxy.onQuery();
                });
                break;
            case EventType.admin_plat_user_change_channel:
                Message.success(SuccessMessage.update);
                this.myProxy.hideDialog();
                this.myProxy.onQuery();
                break;
            case EventType.admin_plat_user_delete_admin_added_user:
                this.myProxy.onQueryForAddMultipleUserTable();
                break;
            case EventType.admin_plat_user_update_admin_added_user:
                this.myProxy.onUpdata_multiple_callback();
                break;
            case GlobalEventType.REFRESH_PAGE:
                this.myProxy.onQuery();
                break;
        }
    }
}
