import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_recharge/setting";
import { Message } from "element-ui";
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import i18n from "@/lang";

export interface IVipRecharge extends IEventDispatcher { }

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
            EventType.admin_vip_recharge_table_columns,
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
            case EventType.admin_vip_recharge_table_columns:
                myProxy.setPlatTableColumns(body);
                break;
            case EventType.admin_plat_user_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_vip_recharge_recharge:
                this.str = LangUtil(
                    "玩家 {0} 成功充值 {1} {2}",
                    myProxy.bodyData.form.user_id,
                    myProxy.bodyData.form.amount,
                    myProxy.bodyData.form.coin_name_unique
                );
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
