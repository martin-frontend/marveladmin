<template>
    <div class="content">
        <StatisticPlatSwapPriceHeader />
        <StatisticPlatSwapPriceBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatSwapPriceMediator from "@/views/statistic_plat_swap_price/mediator/StatisticPlatSwapPriceMediator";
import StatisticPlatSwapPriceProxy from "@/views/statistic_plat_swap_price/proxy/StatisticPlatSwapPriceProxy";
import { Component } from "vue-property-decorator";

import StatisticPlatSwapPriceHeader from "./StatisticPlatSwapPriceHeader.vue";
import StatisticPlatSwapPriceBody from "./StatisticPlatSwapPriceBody.vue";

@Component({
    components: {
        StatisticPlatSwapPriceHeader,
        StatisticPlatSwapPriceBody,
    },
})
export default class StatisticPlatSwapPrice extends AbstractView {
    constructor() {
        super(StatisticPlatSwapPriceMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatSwapPriceProxy = this.getProxy(StatisticPlatSwapPriceProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
