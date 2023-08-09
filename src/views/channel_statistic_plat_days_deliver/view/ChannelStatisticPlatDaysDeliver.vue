<template>
    <div class="content">
        <StatisticPlatDaysDeliverDialog v-if="myProxy.dialogData.bShow"/>
        <StatisticPlatDaysDeliverHeader/>
        <StatisticPlatDaysDeliverBody/>
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticPlatDaysDeliverMediator from "@/views/channel_statistic_plat_days_deliver/mediator/ChannelStatisticPlatDaysDeliverMediator";
import ChannelStatisticPlatDaysDeliverProxy from "../proxy/ChannelStatisticPlatDaysDeliverProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDeliverDialog from "@/views/statistic_plat_days_deliver/view/StatisticPlatDaysDeliverDialog.vue";
import StatisticPlatDaysDeliverHeader from "@/views/statistic_plat_days_deliver/view/StatisticPlatDaysDeliverHeader.vue";
import StatisticPlatDaysDeliverBody from "@/views/statistic_plat_days_deliver/view/StatisticPlatDaysDeliverBody.vue";
import ProgressDialog from "@/views/statistic_plat_days_deliver/view/components/ProgressDialog.vue";
import FieldSelectionDialog from "@/views/statistic_plat_days_deliver/view/components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticPlatDaysDeliverDialog,
        StatisticPlatDaysDeliverHeader,
        StatisticPlatDaysDeliverBody,
        ProgressDialog,
        FieldSelectionDialog,
    }
})
export default class ChannelStatisticPlatDaysDeliver extends AbstractView {

    constructor() {
        super(ChannelStatisticPlatDaysDeliverMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticPlatDaysDeliverProxy = this.getProxy(ChannelStatisticPlatDaysDeliverProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
