<template>
    <div class="content">
        <StatisticCreditUserHeader />
        <StatisticCreditUserBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticCreditUserMediator from "@/views/statistic_credit_user/mediator/StatisticCreditUserMediator";
import StatisticCreditUserProxy from "../proxy/StatisticCreditUserProxy";
import { Component } from "vue-property-decorator";
import StatisticCreditUserHeader from "./StatisticCreditUserHeader.vue";
import StatisticCreditUserBody from "./StatisticCreditUserBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        StatisticCreditUserHeader,
        StatisticCreditUserBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class StatisticCreditUser extends AbstractView {
    constructor() {
        super(StatisticCreditUserMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: StatisticCreditUserProxy = this.getProxy(StatisticCreditUserProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
