<template>
    <div class="content">
        <StatisticBetVendorDaysHeader/>
        <StatisticBetVendorDaysBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticBetVendorDaysMediator from "@/views/statistic_bet_vendor_days/mediator/StatisticBetVendorDaysMediator";
import StatisticBetVendorDaysProxy from "@/views/statistic_bet_vendor_days/proxy/StatisticBetVendorDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticBetVendorDaysHeader from "./StatisticBetVendorDaysHeader.vue";
import StatisticBetVendorDaysBody from "./StatisticBetVendorDaysBody.vue";

@Component({
    components: {
        StatisticBetVendorDaysHeader,
        StatisticBetVendorDaysBody,
    }
})
export default class StatisticBetVendorDays extends AbstractView {

    constructor() {
        super(StatisticBetVendorDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticBetVendorDaysProxy = this.getProxy(StatisticBetVendorDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
