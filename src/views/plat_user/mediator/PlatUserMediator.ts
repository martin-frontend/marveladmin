import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_user/setting";
import { Message, MessageBox } from "element-ui";
import LangUtil from "@/core/global/LangUtil";
import PlatUserProxy from "../proxy/PlatUserProxy";

interface IPlatUser extends IEventDispatcher { }

export default class PlatUserMediator extends AbstractMediator {
    private myProxy: PlatUserProxy = <any>this.getProxy(PlatUserProxy);

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
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatUserProxy = <any>this.facade.retrieveProxy(PlatUserProxy.NAME);
        const myView: IPlatUser = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_index:
                if (this.myProxy.listQuery.page_size == 100000) {
                    myProxy.onSetExcelData(body.list);
                } else {
                    myProxy.setTableData(body);
                }
                break;
            case EventType.admin_plat_user_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_plat_user_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_user_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_user_vendor_withdraw:
                break;
            case EventType.admin_plat_user_update_safe_gold:
                break;
            case EventType.admin_plat_user_update_user_gold:
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_wallet_show_plat:
                myProxy.setWallet(body);
                break;
            case EventType.admin_plat_user_backwater_config:
                myProxy.setPlatUserBackwaterConfig(body);
                break;
            case EventType.admin_plat_user_store_credit_user:
                MessageBox.confirm(
                    <string>(
                        LangUtil(
                            "添加账户成功，帐号{0}，密码{1}",
                            myProxy.creditUserDialogData.form.username,
                            myProxy.creditUserDialogData.form.password
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
                    myProxy.hideDialog();
                    myProxy.onQuery();
                });
                break;
            case EventType.admin_plat_user_change_channel:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
