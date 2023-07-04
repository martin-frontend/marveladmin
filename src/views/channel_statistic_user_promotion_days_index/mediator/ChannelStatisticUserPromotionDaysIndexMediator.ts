import AbstractMediator from "@/core/abstract/AbstractMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";
import StatisticUserPromotionDaysIndexMediator from "@/views/statistic_user_promotion_days_index/mediator/StatisticUserPromotionDaysIndexMediator";
import ChannelStatisticUserPromotionDaysIndexProxy from "@/views/channel_statistic_user_promotion_days_index/proxy/ChannelStatisticUserPromotionDaysIndexProxy";

interface IChannelStatisticUserPromotionDaysIndex extends IEventDispatcher {

}

export default class ChannelStatisticUserPromotionDaysIndexMediator extends StatisticUserPromotionDaysIndexMediator {
    myProxy: ChannelStatisticUserPromotionDaysIndexProxy = <any>this.getProxy(ChannelStatisticUserPromotionDaysIndexProxy);

    protected initViewData() {
        const myView: IChannelStatisticUserPromotionDaysIndex = this.viewComponent;
    }
}
