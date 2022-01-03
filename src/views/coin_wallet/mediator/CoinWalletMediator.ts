import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/coin_wallet/setting";
import { Message } from "element-ui";
import CoinWalletProxy from "../proxy/CoinWalletProxy";
import i18n from "@/lang";

interface ICoinWallet extends IEventDispatcher { }

export default class CoinWalletMediator extends AbstractMediator {
    private myProxy: CoinWalletProxy = <any>this.getProxy(CoinWalletProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICoinWallet = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_coin_wallet_table_columns,
            EventType.admin_coin_wallet_index,
            EventType.admin_coin_wallet_wallet,
            EventType.admin_coin_wallet_deposit,
            EventType.admin_coin_wallet_withdraw,
            EventType.admin_coin_wallet_log_table_columns,
            EventType.admin_coin_wallet_log_index,
            EventType.admin_coin_wallet_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CoinWalletProxy = <any>this.facade.retrieveProxy(CoinWalletProxy.NAME);
        const myView: ICoinWallet = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_coin_wallet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_coin_wallet_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_coin_wallet_wallet:
                break;
            case EventType.admin_coin_wallet_deposit:
                Message.success(i18n.t("coin_wallet.depositSuccess") + `:${this.myProxy.depositData.form.amount}`);
                myProxy.hideDeposit();
                myProxy.onQuery();
                break;
            case EventType.admin_coin_wallet_withdraw:
                Message.success(i18n.t("coin_wallet.depositSuccess") + `:${this.myProxy.withdrawData.form.amount}`);
                myProxy.hideWithdraw();
                myProxy.onQuery();
                break;
            case EventType.admin_coin_wallet_log_table_columns:
                myProxy.setLogTableColumns(body);
                break;
            case EventType.admin_coin_wallet_log_index:
                if (myProxy.logDialogData.isExportExcel) {
                    myProxy.exportExcel(body);
                }
                else {
                    myProxy.setLogData(body);
                }
                break;
            case EventType.admin_coin_wallet_update:
                Message.success(SuccessMessage.update);
                break;
        }
    }
}
