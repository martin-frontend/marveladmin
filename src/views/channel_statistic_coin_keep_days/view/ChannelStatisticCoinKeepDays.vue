<template>
    <div class="content">
        <StatisticCoinKeepDaysDialog v-if="myProxy.dialogData.bShow"/>
        <StatisticCoinKeepDaysHeader/>
        <StatisticCoinKeepDaysBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticCoinKeepDaysMediator from "@/views/channel_statistic_coin_keep_days/mediator/ChannelStatisticCoinKeepDaysMediator";
import ChannelStatisticCoinKeepDaysProxy from "../proxy/ChannelStatisticCoinKeepDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticCoinKeepDaysDialog from "@/views/statistic_coin_keep_days/view/StatisticCoinKeepDaysDialog.vue";
import StatisticCoinKeepDaysHeader from "@/views/statistic_coin_keep_days/view/StatisticCoinKeepDaysHeader.vue";
import StatisticCoinKeepDaysBody from "@/views/statistic_coin_keep_days/view/StatisticCoinKeepDaysBody.vue";

@Component({
    components: {
        StatisticCoinKeepDaysDialog,
        StatisticCoinKeepDaysHeader,
        StatisticCoinKeepDaysBody,
    }
})
export default class ChannelStatisticCoinKeepDays extends AbstractView {

    constructor() {
        super(ChannelStatisticCoinKeepDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticCoinKeepDaysProxy = this.getProxy(ChannelStatisticCoinKeepDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
