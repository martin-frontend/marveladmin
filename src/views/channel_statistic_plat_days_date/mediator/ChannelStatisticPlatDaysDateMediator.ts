import ChannelStatisticPlatDaysDateProxy from "../proxy/ChannelStatisticPlatDaysDateProxy";
import StatisticPlatDaysDateMediator from "@/views/statistic_plat_days_date/mediator/StatisticPlatDaysDateMediator";
import { IEventDispatcher } from "@/core/IEventDispatcher";

interface IChannelStatisticPlatDaysDate extends IEventDispatcher {
    
}

export default class ChannelStatisticPlatDaysDateMediator extends StatisticPlatDaysDateMediator {
    myProxy: ChannelStatisticPlatDaysDateProxy = <any>this.getProxy(ChannelStatisticPlatDaysDateProxy);

    protected initViewData() {
        const myView: IChannelStatisticPlatDaysDate = this.viewComponent;
    }
}
