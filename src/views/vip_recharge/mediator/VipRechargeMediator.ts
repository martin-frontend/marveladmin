import LangUtil from "@/core/global/LangUtil";
import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/vip_recharge/setting";
import { Message } from "element-ui";
import VipRechargeProxy from "../proxy/VipRechargeProxy";
import SelfModel from "@/core/model/SelfModel";
import { UserInfoVO } from "@/core/vo/UserInfoVO";
import { UserType } from "@/core/enum/UserType";

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
        const selfModel: SelfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
        const userInfo: UserInfoVO = selfModel.userInfo;
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
