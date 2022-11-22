<template>
    <div class="content">
        <StatisticBetPlatDaysHeader />
        <StatisticBetPlatDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticBetPlatDaysMediator from "@/views/statistic_bet_plat_days/mediator/StatisticBetPlatDaysMediator";
import StatisticBetPlatDaysProxy from "@/views/statistic_bet_plat_days/proxy/StatisticBetPlatDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticBetPlatDaysHeader from "./StatisticBetPlatDaysHeader.vue";
import StatisticBetPlatDaysBody from "./StatisticBetPlatDaysBody.vue";

@Component({
    components: {
        StatisticBetPlatDaysHeader,
        StatisticBetPlatDaysBody,
    },
})
export default class StatisticBetPlatDays extends AbstractView {
    constructor() {
        super(StatisticBetPlatDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticBetPlatDaysProxy = this.getProxy(StatisticBetPlatDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
