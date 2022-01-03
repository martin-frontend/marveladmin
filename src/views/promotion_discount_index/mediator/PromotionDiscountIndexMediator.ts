import AbstractMediator from "@/core/abstract/AbstractMediator";
import { SuccessMessage } from "@/core/global/Constant";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import { EventType, HttpType } from "@/views/promotion_discount_index/setting";
import { Message } from "element-ui";
import PromotionDiscountIndexProxy from "../proxy/PromotionDiscountIndexProxy";

interface IPromotionDiscountIndex extends IEventDispatcher {

}

export default class PromotionDiscountIndexMediator extends AbstractMediator {
    private myProxy: PromotionDiscountIndexProxy = <any>this.getProxy(PromotionDiscountIndexProxy);

    onRegister() {
        this.myProxy.enter();
    }

    onRemove() {
        this.myProxy.leave();
    }

    protected initViewData() {
        const myView: IPromotionDiscountIndex = this.viewComponent;
    }

    listNotificationInterests(): string[] {
        return [
            EventType.admin_plat_users_bet_table_columns,
            EventType.admin_plat_users_bet_promotion_discount_index,
            EventType.admin_plat_users_bet_promotion_discount_recover,
            EventType.admin_plat_users_bet_store_fake_bet
        ];
    }

    handleNotification(notification: puremvc.INotification) {
        const myProxy: PromotionDiscountIndexProxy = <any>this.facade.retrieveProxy(PromotionDiscountIndexProxy.NAME);
        const myView: IPromotionDiscountIndex = this.viewComponent;
        const body = notification.getBody();
        switch (notification.getName()) {
            case EventType.admin_plat_users_bet_table_columns:
                myProxy.setTableColumns(body);
                break;
            case EventType.admin_plat_users_bet_promotion_discount_index:
                myProxy.setTableData(body);
                break;
            case EventType.admin_plat_users_bet_promotion_discount_recover:
                myProxy.onQuery();
                break;
            case EventType.admin_plat_users_bet_store_fake_bet:
                Message.success(SuccessMessage.create);
                myProxy.hideDialog();
                break;
        }
    }
}
