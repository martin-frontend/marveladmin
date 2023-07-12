<template>
    <div class="content">
        <StatisticPlatDaysDateDialog v-if="myProxy.dialogData.bShow"/>
        <StatisticPlatDaysDateHeader/>
        <StatisticPlatDaysDateBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticPlatDaysDateMediator from "@/views/channel_statistic_plat_days_date/mediator/ChannelStatisticPlatDaysDateMediator";
import ChannelStatisticPlatDaysDateProxy from "../proxy/ChannelStatisticPlatDaysDateProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDateDialog from "@/views/statistic_plat_days_date/view/StatisticPlatDaysDateDialog.vue";
import StatisticPlatDaysDateHeader from "@/views/statistic_plat_days_date/view/StatisticPlatDaysDateHeader.vue";
import StatisticPlatDaysDateBody from "@/views/statistic_plat_days_date/view/StatisticPlatDaysDateBody.vue";

@Component({
    components: {
        StatisticPlatDaysDateDialog,
        StatisticPlatDaysDateHeader,
        StatisticPlatDaysDateBody,
    }
})
export default class ChannelStatisticPlatDaysDate extends AbstractView {

    constructor() {
        super(ChannelStatisticPlatDaysDateMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticPlatDaysDateProxy = this.getProxy(ChannelStatisticPlatDaysDateProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
