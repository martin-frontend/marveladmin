import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelStatisticPlatDaysDeliverChannelProxy from "../proxy/ChannelStatisticPlatDaysDeliverChannelProxy";
import StatisticPlatDaysDeliverChannelMediator from "@/views/statistic_plat_days_deliver_channel/mediator/StatisticPlatDaysDeliverChannelMediator";

interface IChannelStatisticPlatDaysDeliverChannel extends IEventDispatcher {}

export default class ChannelStatisticPlatDaysDeliverChannelMediator extends StatisticPlatDaysDeliverChannelMediator {
    myProxy: ChannelStatisticPlatDaysDeliverChannelProxy = <any>(
        this.getProxy(ChannelStatisticPlatDaysDeliverChannelProxy)
    );
}
