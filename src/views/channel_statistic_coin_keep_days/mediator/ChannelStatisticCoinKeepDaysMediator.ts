import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelStatisticCoinKeepDaysProxy from "../proxy/ChannelStatisticCoinKeepDaysProxy";
import StatisticCoinKeepDaysMediator from "@/views/statistic_coin_keep_days/mediator/StatisticCoinKeepDaysMediator";

interface IChannelStatisticCoinKeepDays extends IEventDispatcher {
    
}

export default class ChannelStatisticCoinKeepDaysMediator extends StatisticCoinKeepDaysMediator {
    myProxy: ChannelStatisticCoinKeepDaysProxy = <any>this.getProxy(ChannelStatisticCoinKeepDaysProxy);

    protected initViewData() {
        const myView: IChannelStatisticCoinKeepDays = this.viewComponent;
    }
}
