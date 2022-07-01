<template>
    <div class="content">
        <StatisticPlatSwapOrdersHeader />
        <StatisticPlatSwapOrdersBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatSwapOrdersMediator from "@/views/statistic_plat_swap_orders/mediator/StatisticPlatSwapOrdersMediator";
import StatisticPlatSwapOrdersProxy from "@/views/statistic_plat_swap_orders/proxy/StatisticPlatSwapOrdersProxy";
import { Component } from "vue-property-decorator";

import StatisticPlatSwapOrdersHeader from "./StatisticPlatSwapOrdersHeader.vue";
import StatisticPlatSwapOrdersBody from "./StatisticPlatSwapOrdersBody.vue";

@Component({
    components: {
        StatisticPlatSwapOrdersHeader,
        StatisticPlatSwapOrdersBody,
    },
})
export default class StatisticPlatSwapOrders extends AbstractView {
    constructor() {
        super(StatisticPlatSwapOrdersMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatSwapOrdersProxy = this.getProxy(StatisticPlatSwapOrdersProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
