<template>
    <div class="content">
        <StatisticAgentKeepDaysHeader/>
        <StatisticAgentKeepDaysBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticAgentKeepDaysMediator from "@/views/statistic_agent_keep_days/mediator/StatisticAgentKeepDaysMediator";
import StatisticAgentKeepDaysProxy from "../proxy/StatisticAgentKeepDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticAgentKeepDaysHeader from "./StatisticAgentKeepDaysHeader.vue";
import StatisticAgentKeepDaysBody from "./StatisticAgentKeepDaysBody.vue";

@Component({
    components: {
        StatisticAgentKeepDaysHeader,
        StatisticAgentKeepDaysBody,
    }
})
export default class StatisticAgentKeepDays extends AbstractView {

    constructor() {
        super(StatisticAgentKeepDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticAgentKeepDaysProxy = this.getProxy(StatisticAgentKeepDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
