<template>
    <div class="content">
        <PlatActivityStatisticDialog v-if="myProxy.dialogData.bShow" />
        <PlatActivityStatisticHeader />
        <PlatActivityStatisticBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityStatisticMediator from "@/views/plat_activity_statistic/mediator/PlatActivityStatisticMediator";
import PlatActivityStatisticProxy from "../proxy/PlatActivityStatisticProxy";
import { Component } from "vue-property-decorator";
import PlatActivityStatisticDialog from "./PlatActivityStatisticDialog.vue";
import PlatActivityStatisticHeader from "./PlatActivityStatisticHeader.vue";
import PlatActivityStatisticBody from "./PlatActivityStatisticBody.vue";
import ProgressDialog from "./component/ProgressDialog.vue";
import FieldSelectionDialog from "./component/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatActivityStatisticDialog,
        PlatActivityStatisticHeader,
        PlatActivityStatisticBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class PlatActivityStatistic extends AbstractView {
    constructor() {
        super(PlatActivityStatisticMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatActivityStatisticProxy = this.getProxy(PlatActivityStatisticProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
