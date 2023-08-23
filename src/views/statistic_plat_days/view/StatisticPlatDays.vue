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
import StatisticPlatDaysMediator from "@/views/statistic_plat_days/mediator/StatisticPlatDaysMediator";
import StatisticPlatDaysProxy from "@/views/statistic_plat_days/proxy/StatisticPlatDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDaysDialog from "./StatisticPlatDaysDialog.vue";
import StatisticPlatDaysHeader from "./StatisticPlatDaysHeader.vue";
import StatisticPlatDaysBody from "./StatisticPlatDaysBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

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
        super(StatisticPlatDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticPlatDaysProxy = this.getProxy(StatisticPlatDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
