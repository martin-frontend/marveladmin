import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelPlatUserStatisticRankDaysProxy from "../proxy/ChannelPlatUserStatisticRankDaysProxy";
import PlatUserStatisticRankDaysMediator from "@/views/plat_user_statistic_rank_days/mediator/PlatUserStatisticRankDaysMediator";

interface IChannelPlatUserStatisticRankDays extends IEventDispatcher {

}

export default class ChannelPlatUserStatisticRankDaysMediator extends PlatUserStatisticRankDaysMediator {
    myProxy: ChannelPlatUserStatisticRankDaysProxy = <any>this.getProxy(ChannelPlatUserStatisticRankDaysProxy);

    protected initViewData() {
        const myView: IChannelPlatUserStatisticRankDays = this.viewComponent;
    }
}
