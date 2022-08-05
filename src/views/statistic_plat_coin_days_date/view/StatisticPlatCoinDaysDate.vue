<template>
    <div>
        <StatisticPlatCoinDaysDateHeader />
        <StatisticPlatCoinDaysDateBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatCoinDaysDateMediator from "@/views/statistic_plat_coin_days_date/mediator/StatisticPlatCoinDaysDateMediator";
import { Component } from "vue-property-decorator";
import StatisticPlatCoinDaysDateHeader from "./StatisticPlatCoinDaysDateHeader.vue";
import StatisticPlatCoinDaysDateBody from "./StatisticPlatCoinDaysDateBody.vue";

@Component({
    components: {
        StatisticPlatCoinDaysDateHeader,
        StatisticPlatCoinDaysDateBody,
    },
})
export default class StatisticPlatCoinDaysDate extends AbstractView {
    constructor() {
        super(StatisticPlatCoinDaysDateMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss"></style>
