import { IEventDispatcher } from "@/core/IEventDispatcher";
import ChannelStatisticAgentKeepDaysProxy from "../proxy/ChannelStatisticAgentKeepDaysProxy";
import StatisticAgentKeepDaysMediator from "@/views/statistic_agent_keep_days/mediator/StatisticAgentKeepDaysMediator";

interface IChannelStatisticAgentKeepDays extends IEventDispatcher {}
export default class ChannelStatisticAgentKeepDaysMediator extends StatisticAgentKeepDaysMediator {
    myProxy: ChannelStatisticAgentKeepDaysProxy = <any>this.getProxy(ChannelStatisticAgentKeepDaysProxy);

    protected initViewData() {
        const myView: IChannelStatisticAgentKeepDays = this.viewComponent;
    }
}
