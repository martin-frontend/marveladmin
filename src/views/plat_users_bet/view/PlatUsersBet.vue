<template>
    <div class="content">
        <PlatUserBetDetail v-if="myProxy.dialogData.bShow"></PlatUserBetDetail>
        <JsonEditorDialog v-if="myProxy.jsonEditorDialog.bShow"></JsonEditorDialog>
        <PlatUsersBetHeader />
        <PlatUsersBetBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
        <PlatUsersBetStatisticDialog v-if="myProxy.statisticDialog.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersBetMediator from "@/views/plat_users_bet/mediator/PlatUsersBetMediator";
import PlatUsersBetProxy from "@/views/plat_users_bet/proxy/PlatUsersBetProxy";
import { Component } from "vue-property-decorator";
import PlatUserBetDetail from "@/views/plat_users_bet/view/PlatUserBetDetail.vue";
import JsonEditorDialog from "@/views/plat_users_bet/view/JsonEditorDialog.vue";
import PlatUsersBetHeader from "./PlatUsersBetHeader.vue";
import PlatUsersBetBody from "./PlatUsersBetBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";
import PlatUsersBetStatisticDialog from "./PlatUsersBetStatisticDialog.vue";

@Component({
    components: {
        PlatUserBetDetail,
        PlatUsersBetHeader,
        PlatUsersBetBody,
        JsonEditorDialog,
        ProgressDialog,
        FieldSelectionDialog,
        PlatUsersBetStatisticDialog,
    },
})
export default class PlatUsersBet extends AbstractView {
    constructor() {
        super(PlatUsersBetMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
