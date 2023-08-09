<template>
    <div class="content">
        <StatisticPlatDaysDeliverDialog v-if="myProxy.dialogData.bShow" />
        <StatisticPlatDaysDeliverHeader />
        <StatisticPlatDaysDeliverBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatDaysDeliverMediator from "@/views/statistic_plat_days_deliver/mediator/StatisticPlatDaysDeliverMediator";
import StatisticPlatDaysDeliverProxy from "../proxy/StatisticPlatDaysDeliverProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDeliverDialog from "./StatisticPlatDaysDeliverDialog.vue";
import StatisticPlatDaysDeliverHeader from "./StatisticPlatDaysDeliverHeader.vue";
import StatisticPlatDaysDeliverBody from "./StatisticPlatDaysDeliverBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticPlatDaysDeliverDialog,
        StatisticPlatDaysDeliverHeader,
        StatisticPlatDaysDeliverBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class StatisticPlatDaysDeliver extends AbstractView {
    constructor() {
        super(StatisticPlatDaysDeliverMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatDaysDeliverProxy = this.getProxy(StatisticPlatDaysDeliverProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
