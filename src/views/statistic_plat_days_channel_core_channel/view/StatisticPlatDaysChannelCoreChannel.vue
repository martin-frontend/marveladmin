<template>
    <div class="content">
        <StatisticPlatDaysChannelCoreChannelDialog v-if="myProxy.dialogData.bShow" />
        <StatisticPlatDaysChannelCoreChannelHeader />
        <StatisticPlatDaysChannelCoreChannelBody />
        <ProgressDialog />
        <FieldSelectionDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatDaysChannelCoreChannelMediator from "@/views/statistic_plat_days_channel_core_channel/mediator/StatisticPlatDaysChannelCoreChannelMediator";
import StatisticPlatDaysChannelCoreChannelProxy from "../proxy/StatisticPlatDaysChannelCoreChannelProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysChannelCoreChannelDialog from "./StatisticPlatDaysChannelCoreChannelDialog.vue";
import StatisticPlatDaysChannelCoreChannelHeader from "./StatisticPlatDaysChannelCoreChannelHeader.vue";
import StatisticPlatDaysChannelCoreChannelBody from "./StatisticPlatDaysChannelCoreChannelBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticPlatDaysChannelCoreChannelDialog,
        StatisticPlatDaysChannelCoreChannelHeader,
        StatisticPlatDaysChannelCoreChannelBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class StatisticPlatDaysChannelCoreChannel extends AbstractView {
    constructor() {
        super(StatisticPlatDaysChannelCoreChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: StatisticPlatDaysChannelCoreChannelProxy = this.getProxy(StatisticPlatDaysChannelCoreChannelProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
