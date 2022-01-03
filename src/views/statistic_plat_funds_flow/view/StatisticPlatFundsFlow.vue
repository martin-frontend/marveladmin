<template>
    <div class="content">
        <StatisticPlatFundsFlowHeader />
        <StatisticPlatFundsFlowBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatFundsFlowMediator from "@/views/statistic_plat_funds_flow/mediator/StatisticPlatFundsFlowMediator";
import StatisticPlatFundsFlowProxy from "@/views/statistic_plat_funds_flow/proxy/StatisticPlatFundsFlowProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatFundsFlowHeader from "./StatisticPlatFundsFlowHeader.vue";
import StatisticPlatFundsFlowBody from "./StatisticPlatFundsFlowBody.vue";

@Component({
    components: {
        StatisticPlatFundsFlowHeader,
        StatisticPlatFundsFlowBody,
    },
})
export default class StatisticPlatFundsFlow extends AbstractView {
    constructor() {
        super(StatisticPlatFundsFlowMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatFundsFlowProxy = this.getProxy(StatisticPlatFundsFlowProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
