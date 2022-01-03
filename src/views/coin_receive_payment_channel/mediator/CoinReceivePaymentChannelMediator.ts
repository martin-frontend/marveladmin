import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/coin_receive_payment_channel/setting";
import { Message } from "element-ui";
import CoinReceivePaymentChannelProxy from "../proxy/CoinReceivePaymentChannelProxy";

interface ICoinReceivePaymentChannel extends IEventDispatcher {}

export default class CoinReceivePaymentChannelMediator extends AbstractMediator {
    private myProxy: CoinReceivePaymentChannelProxy = <any>this.getProxy(CoinReceivePaymentChannelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: ICoinReceivePaymentChannel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_coin_receive_payment_channel_table_columns,
            EventType.admin_coin_receive_payment_channel_index,
            EventType.admin_coin_receive_payment_channel_show,
            EventType.admin_coin_receive_payment_channel_store,
            EventType.admin_coin_receive_payment_channel_update,
            EventType.admin_common_bank_list,
            EventType.admin_resource_upload,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: CoinReceivePaymentChannelProxy = <any>(
            this.facade.retrieveProxy(CoinReceivePaymentChannelProxy.NAME)
        );
        const myView: ICoinReceivePaymentChannel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_coin_receive_payment_channel_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_coin_receive_payment_channel_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_coin_receive_payment_channel_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_coin_receive_payment_channel_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_coin_receive_payment_channel_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
            case EventType.admin_common_bank_list:
                myProxy.setGetBankList(body);
                break;
            case EventType.admin_resource_upload:
                myProxy.uploadSuccess(body);
                break;
        }
    }
}
