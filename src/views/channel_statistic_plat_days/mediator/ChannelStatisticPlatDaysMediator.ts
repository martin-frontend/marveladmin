import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelStatisticPlatDaysProxy from "../proxy/ChannelStatisticPlatDaysProxy";
import StatisticPlatDaysMediator from "@/views/statistic_plat_days/mediator/StatisticPlatDaysMediator";

interface IChannelStatisticPlatDays extends IEventDispatcher {
    
}

export default class ChannelStatisticPlatDaysMediator extends StatisticPlatDaysMediator {
    myProxy: ChannelStatisticPlatDaysProxy = <any>this.getProxy(ChannelStatisticPlatDaysProxy);
}
