<template>
    <div class="content">
        <StatisticPlatDaysDeliverChannelDialog v-if="myProxy.dialogData.bShow" />
        <StatisticPlatDaysDeliverChannelHeader />
        <StatisticPlatDaysDeliverChannelBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticPlatDaysDeliverChannelMediator from "@/views/channel_statistic_plat_days_deliver_channel/mediator/ChannelStatisticPlatDaysDeliverChannelMediator";
import ChannelStatisticPlatDaysDeliverChannelProxy from "../proxy/ChannelStatisticPlatDaysDeliverChannelProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDeliverChannelDialog from "@/views/statistic_plat_days_deliver_channel/view/StatisticPlatDaysDeliverChannelDialog.vue";
import StatisticPlatDaysDeliverChannelHeader from "@/views/statistic_plat_days_deliver_channel/view/StatisticPlatDaysDeliverChannelHeader.vue";
import StatisticPlatDaysDeliverChannelBody from "@/views/statistic_plat_days_deliver_channel/view/StatisticPlatDaysDeliverChannelBody.vue";
import ProgressDialog from "@/views/statistic_plat_days_deliver_channel/view/components/ProgressDialog.vue";
import FieldSelectionDialog from "@/views/statistic_plat_days_deliver_channel/view/components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticPlatDaysDeliverChannelDialog,
        StatisticPlatDaysDeliverChannelHeader,
        StatisticPlatDaysDeliverChannelBody,
        ProgressDialog,
        FieldSelectionDialog,
    }
})
export default class ChannelStatisticPlatDaysDeliverChannel extends AbstractView {

    constructor() {
        super(ChannelStatisticPlatDaysDeliverChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticPlatDaysDeliverChannelProxy = this.getProxy(ChannelStatisticPlatDaysDeliverChannelProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
