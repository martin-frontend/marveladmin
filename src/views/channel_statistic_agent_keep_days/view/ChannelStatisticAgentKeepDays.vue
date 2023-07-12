<template>
    <div class="content">
        <StatisticAgentKeepDaysHeader />
        <StatisticAgentKeepDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticAgentKeepDaysMediator from "@/views/channel_statistic_agent_keep_days/mediator/ChannelStatisticAgentKeepDaysMediator";
import ChannelStatisticAgentKeepDaysProxy from "../proxy/ChannelStatisticAgentKeepDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticAgentKeepDaysHeader from "@/views/statistic_agent_keep_days/view/StatisticAgentKeepDaysHeader.vue";
import StatisticAgentKeepDaysBody from "@/views/statistic_agent_keep_days/view/StatisticAgentKeepDaysBody.vue";

@Component({
    components: {
        StatisticAgentKeepDaysHeader,
        StatisticAgentKeepDaysBody,
    },
})
export default class ChannelStatisticAgentKeepDays extends AbstractView {
    constructor() {
        super(ChannelStatisticAgentKeepDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticAgentKeepDaysProxy = this.getProxy(ChannelStatisticAgentKeepDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
