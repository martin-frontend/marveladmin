import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelStatisticPlatDaysDeliverProxy from "../proxy/ChannelStatisticPlatDaysDeliverProxy";
import StatisticPlatDaysDeliverMediator from "@/views/statistic_plat_days_deliver/mediator/StatisticPlatDaysDeliverMediator";

interface IChannelStatisticPlatDaysDeliver extends IEventDispatcher {
    
}
export default class ChannelStatisticPlatDaysDeliverMediator extends StatisticPlatDaysDeliverMediator {
    myProxy: ChannelStatisticPlatDaysDeliverProxy = <any>this.getProxy(ChannelStatisticPlatDaysDeliverProxy);
}
