<template>
    <div class="content">
        <StatisticCoinKeepDaysDialog v-if="myProxy.dialogData.bShow"/>
        <StatisticCoinKeepDaysHeader/>
        <StatisticCoinKeepDaysBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticCoinKeepDaysMediator from "@/views/statistic_coin_keep_days/mediator/StatisticCoinKeepDaysMediator";
import StatisticCoinKeepDaysProxy from "../proxy/StatisticCoinKeepDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticCoinKeepDaysDialog from "./StatisticCoinKeepDaysDialog.vue";
import StatisticCoinKeepDaysHeader from "./StatisticCoinKeepDaysHeader.vue";
import StatisticCoinKeepDaysBody from "./StatisticCoinKeepDaysBody.vue";

@Component({
    components: {
        StatisticCoinKeepDaysDialog,
        StatisticCoinKeepDaysHeader,
        StatisticCoinKeepDaysBody,
    }
})
export default class StatisticCoinKeepDays extends AbstractView {

    constructor() {
        super(StatisticCoinKeepDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticCoinKeepDaysProxy = this.getProxy(StatisticCoinKeepDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
