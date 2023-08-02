import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_replenish_recharge/setting";
import { Message } from "element-ui";
import VipReplenishRechargeProxy from "../proxy/VipReplenishRechargeProxy";
import SelfModel from "@/core/model/SelfModel";
import { UserInfoVO } from "@/core/vo/UserInfoVO";
import { UserType } from "@/core/enum/UserType";

export interface IVipReplenishRecharge extends IEventDispatcher {}

export default class VipReplenishRechargeMediator extends AbstractMediator {
    private myProxy: VipReplenishRechargeProxy = <any>this.getProxy(VipReplenishRechargeProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IVipReplenishRecharge = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_vip_replenish_recharge_table_columns,
            EventType.admin_vip_replenish_recharge_recharge,
            EventType.admin_coin_wallet_wallet,
            EventType.admin_plat_user_table_columns,
            EventType.admin_plat_user_show,
        ];
    }
    private str: any = "";
    handleNotification(notification: puremvc.INotification) {
        const myProxy: VipReplenishRechargeProxy = <any>this.facade.retrieveProxy(VipReplenishRechargeProxy.NAME);
        const myView: IVipReplenishRecharge = this.viewComponent;
        const selfModel: SelfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
        const userInfo: UserInfoVO = selfModel.userInfo;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_user_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_vip_replenish_recharge_table_columns:
                myProxy.setPlatTableColumns(body);
                break;
            case EventType.admin_plat_user_show:
                myProxy.setDetail(body);
                break;
            case EventType.admin_vip_replenish_recharge_recharge:
                this.str = LangUtil(
                    "玩家<p class='text-hidden'>{0}</p>成功充值 {1} {2}",
                    myProxy.bodyData.form.user_id,
                    myProxy.bodyData.form.amount,
                    myProxy.bodyData.form.coin_name_unique
                );
                Message.success({
                    message: this.str,
                    dangerouslyUseHTMLString: true,
                });
                myProxy.resetForm();
                myProxy.bodyData.isRechargeSuccess = +new Date();
                myProxy.setUserInfo();
                break;
            case EventType.admin_coin_wallet_wallet:
                switch (userInfo.type) {
                    case UserType.COIN:
                    case UserType.COINUSEREXCHANGE:
                        myProxy.bodyData.gold = body;
                        break;
                    default:
                        myProxy.bodyData.gold = <string>LangUtil("无限制");
                }
                break;
        }
    }
}
