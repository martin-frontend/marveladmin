<template>
    <div class="content statistic_plat_days">
        <StatisticPlatDaysDialog v-if="myProxy.dialogData.bShow" />
        <StatisticPlatDaysHeader />
        <StatisticPlatDaysBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticPlatDaysMediator from "@/views/channel_statistic_plat_days/mediator/ChannelStatisticPlatDaysMediator";
import ChannelStatisticPlatDaysProxy from "@/views/channel_statistic_plat_days/proxy/ChannelStatisticPlatDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDialog from "@/views/statistic_plat_days/view/StatisticPlatDaysDialog.vue";
import StatisticPlatDaysHeader from "@/views/statistic_plat_days/view/StatisticPlatDaysHeader.vue";
import StatisticPlatDaysBody from "@/views/statistic_plat_days/view/StatisticPlatDaysBody.vue";
import ProgressDialog from "@/views/statistic_plat_days/view/components/ProgressDialog.vue";
import FieldSelectionDialog from "@/views/statistic_plat_days/view/components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticPlatDaysDialog,
        StatisticPlatDaysHeader,
        StatisticPlatDaysBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class StatisticPlatDays extends AbstractView {
    constructor() {
        super(ChannelStatisticPlatDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: ChannelStatisticPlatDaysProxy = this.getProxy(ChannelStatisticPlatDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
