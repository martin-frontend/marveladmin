import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_receive_payment_channel/setting";
import { Message } from "element-ui";
import VipReceivePaymentChannelProxy from "../proxy/VipReceivePaymentChannelProxy";

interface IVipReceivePaymentChannel extends IEventDispatcher {}

export default class VipReceivePaymentChannelMediator extends AbstractMediator {
    private myProxy: VipReceivePaymentChannelProxy = <any>this.getProxy(VipReceivePaymentChannelProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVipReceivePaymentChannel = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vip_receive_payment_channel_table_columns,
            EventType.admin_vip_receive_payment_channel_index,
            EventType.admin_vip_receive_payment_channel_show,
            EventType.admin_vip_receive_payment_channel_store,
            EventType.admin_vip_receive_payment_channel_update,
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: VipReceivePaymentChannelProxy = <any>(
            this.facade.retrieveProxy(VipReceivePaymentChannelProxy.NAME)
        );
        const myView: IVipReceivePaymentChannel = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_vip_receive_payment_channel_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_vip_receive_payment_channel_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_vip_receive_payment_channel_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_vip_receive_payment_channel_store:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                myProxy.listQuery.page_count = 1;
                myProxy.onQuery();
                break;
            case EventType.admin_vip_receive_payment_channel_update:
                Message.success(SuccessMessage.update);
                myProxy.hideDialog();
                myProxy.onQuery();
                break;
        }
    }
}
