<template>
    <div class="content">
        <StatisticPlatDaysDateDialog v-if="myProxy.dialogData.bShow"/>
        <StatisticPlatDaysDateHeader/>
        <StatisticPlatDaysDateBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatDaysDateMediator from "@/views/statistic_plat_days_date/mediator/StatisticPlatDaysDateMediator";
import StatisticPlatDaysDateProxy from "../proxy/StatisticPlatDaysDateProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDateDialog from "./StatisticPlatDaysDateDialog.vue";
import StatisticPlatDaysDateHeader from "./StatisticPlatDaysDateHeader.vue";
import StatisticPlatDaysDateBody from "./StatisticPlatDaysDateBody.vue";

@Component({
    components: {
        StatisticPlatDaysDateDialog,
        StatisticPlatDaysDateHeader,
        StatisticPlatDaysDateBody,
    }
})
export default class StatisticPlatDaysDate extends AbstractView {

    constructor() {
        super(StatisticPlatDaysDateMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatDaysDateProxy = this.getProxy(StatisticPlatDaysDateProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
