import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/plat_vendors_wallet/setting";
import { Message } from "element-ui";
import PlatVendorsWalletProxy from "../proxy/PlatVendorsWalletProxy";
import i18n from "@/lang";

interface IPlatVendorsWallet extends IEventDispatcher {}

export default class PlatVendorsWalletMediator extends AbstractMediator {
    private myProxy: PlatVendorsWalletProxy = <any>this.getProxy(PlatVendorsWalletProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPlatVendorsWallet = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_vendors_wallet_table_columns,
            EventType.admin_plat_vendors_wallet_index,
            EventType.admin_plat_vendors_wallet_show,
            EventType.admin_plat_vendors_wallet_store,
            EventType.admin_plat_vendors_wallet_update,
            EventType.admin_plat_vendors_wallet_index_vendors,
            EventType.admin_plat_vendors_wallet_update_gold,
            EventType.admin_plat_vendors_wallet_log_table_columns,
            EventType.admin_plat_vendors_wallet_log_index,
            EventType.admin_plat_vendors_wallet_log_show,
            EventType.admin_plat_wallet_update_gold,
            EventType.admin_plat_wallet_log_index,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PlatVendorsWalletProxy = <any>this.facade.retrieveProxy(PlatVendorsWalletProxy.NAME);
        const myView: IPlatVendorsWallet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_vendors_wallet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_vendors_wallet_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_vendors_wallet_show:
                // myProxy.setDetail(body);
                break;
            case EventType.admin_plat_vendors_wallet_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_plat_vendors_wallet_update:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_vendors_wallet_index_vendors:
                myProxy.setCreateData(body);
                break;
            case EventType.admin_plat_vendors_wallet_update_gold:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_vendors_wallet_log_table_columns:
                myProxy.setLogTableColumns(body);
                break;
            case EventType.admin_plat_vendors_wallet_log_index:
                myProxy.setLogTableData(body);
                break;
            case EventType.admin_plat_vendors_wallet_log_show:
                break;
            case EventType.admin_plat_wallet_update_gold:
                Message.success(<any>LangUtil("操作成功"));
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_plat_wallet_log_index:
                myProxy.setLogTableData(body);
                break;
        }
    }
}
