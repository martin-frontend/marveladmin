<template>
    <div class="content statistic_plat_coin_days">
        <StatisticPlatCoinDaysHeader />
        <StatisticPlatCoinDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatCoinDaysMediator from "@/views/statistic_plat_coin_days/mediator/StatisticPlatCoinDaysMediator";
import { Component } from "vue-property-decorator";
import StatisticPlatCoinDaysHeader from "./StatisticPlatCoinDaysHeader.vue";
import StatisticPlatCoinDaysBody from "./StatisticPlatCoinDaysBody.vue";

@Component({
    components: {
        StatisticPlatCoinDaysHeader,
        StatisticPlatCoinDaysBody,
    },
})
export default class StatisticPlatCoinDays extends AbstractView {
    constructor() {
        super(StatisticPlatCoinDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
