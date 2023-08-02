<template>
    <div class="content">
        <PlatUserStatisticRankDaysDialog v-if="myProxy.dialogData.bShow" />
        <PlatUserStatisticRankDaysHeader />
        <PlatUserStatisticRankDaysBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserStatisticRankDaysMediator from "@/views/plat_user_statistic_rank_days/mediator/PlatUserStatisticRankDaysMediator";
import PlatUserStatisticRankDaysProxy from "@/views/plat_user_statistic_rank_days/proxy/PlatUserStatisticRankDaysProxy";
import { Component } from "vue-property-decorator";
import PlatUserStatisticRankDaysDialog from "./PlatUserStatisticRankDaysDialog.vue";
import PlatUserStatisticRankDaysHeader from "./PlatUserStatisticRankDaysHeader.vue";
import PlatUserStatisticRankDaysBody from "./PlatUserStatisticRankDaysBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatUserStatisticRankDaysDialog,
        PlatUserStatisticRankDaysHeader,
        PlatUserStatisticRankDaysBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class PlatUserStatisticRankDays extends AbstractView {
    constructor() {
        super(PlatUserStatisticRankDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatUserStatisticRankDaysProxy = this.getProxy(PlatUserStatisticRankDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
