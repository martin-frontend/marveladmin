import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelStatisticUserKeepDaysProxy from "../proxy/ChannelStatisticUserKeepDaysProxy";
import StatisticUserKeepDaysMediator from "@/views/statistic_user_keep_days/mediator/StatisticUserKeepDaysMediator";

interface IChannelStatisticUserKeepDays extends IEventDispatcher {
    
}

export default class ChannelStatisticUserKeepDaysMediator extends StatisticUserKeepDaysMediator {
    myProxy: ChannelStatisticUserKeepDaysProxy = <any>this.getProxy(ChannelStatisticUserKeepDaysProxy);
    initViewData() {
        const myView: IChannelStatisticUserKeepDays = this.viewComponent;
    }
}
