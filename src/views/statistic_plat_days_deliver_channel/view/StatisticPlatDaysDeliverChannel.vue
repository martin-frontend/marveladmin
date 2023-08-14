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
import StatisticPlatDaysDeliverChannelMediator from "@/views/statistic_plat_days_deliver_channel/mediator/StatisticPlatDaysDeliverChannelMediator";
import StatisticPlatDaysDeliverChannelProxy from "../proxy/StatisticPlatDaysDeliverChannelProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDeliverChannelDialog from "./StatisticPlatDaysDeliverChannelDialog.vue";
import StatisticPlatDaysDeliverChannelHeader from "./StatisticPlatDaysDeliverChannelHeader.vue";
import StatisticPlatDaysDeliverChannelBody from "./StatisticPlatDaysDeliverChannelBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticPlatDaysDeliverChannelDialog,
        StatisticPlatDaysDeliverChannelHeader,
        StatisticPlatDaysDeliverChannelBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class StatisticPlatDaysDeliverChannel extends AbstractView {
    constructor() {
        super(StatisticPlatDaysDeliverChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatDaysDeliverChannelProxy = this.getProxy(StatisticPlatDaysDeliverChannelProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
