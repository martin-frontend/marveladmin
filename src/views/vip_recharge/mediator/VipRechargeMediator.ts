import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_recharge/setting";
import { Message } from "element-ui";
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import i18n from "@/lang";

export interface IVipRecharge extends IEventDispatcher {}

export default class VipRechargeMediator extends AbstractMediator {
    private myProxy: VipRechargeProxy = <any>this.getProxy(VipRechargeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVipRecharge = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vip_recharge_recharge,
            EventType.admin_coin_wallet_wallet,
            EventType.admin_plat_user_table_columns,
            EventType.admin_plat_user_show,
        ];
    }
    private str: any = "";
    handleNotification(notification: puremvc.INotification) {
        const myProxy: VipRechargeProxy = <any>this.facade.retrieveProxy(VipRechargeProxy.NAME);
        const myView: IVipRecharge = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_user_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_vip_recharge_recharge:
                this.str = i18n.t("vip_recharge.success", {
                    "0": myProxy.bodyData.form.user_id,
                    "1": myProxy.bodyData.form.amount,
                });
                Message.success(this.str);
                myProxy.resetForm();
                myProxy.bodyData.isRechargeSuccess = +new Date();
                myProxy.setUserInfo();
                break;
            case EventType.admin_coin_wallet_wallet:
                myProxy.bodyData.gold = body;
                break;
        }
    }
}
