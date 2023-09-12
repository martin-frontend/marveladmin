<template>
    <div class="content">
        <PlatCoinTasksDialog v-if="myProxy.dialogData.bShow" />
        <VendorDialog v-if="myProxy.vendorDialogData.bShow" />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
        <PlatCoinTasksHeader />
        <PlatCoinTasksBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatCoinTasksMediator from "@/views/plat_coin_tasks/mediator/PlatCoinTasksMediator";
import PlatCoinTasksProxy from "../proxy/PlatCoinTasksProxy";
import { Component } from "vue-property-decorator";
import PlatCoinTasksDialog from "./PlatCoinTasksDialog.vue";
import PlatCoinTasksHeader from "./PlatCoinTasksHeader.vue";
import PlatCoinTasksBody from "./PlatCoinTasksBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";
import VendorDialog from "./VendorDialog.vue";

@Component({
    components: {
        PlatCoinTasksDialog,
        PlatCoinTasksHeader,
        PlatCoinTasksBody,
        VendorDialog,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class PlatCoinTasks extends AbstractView {
    constructor() {
        super(PlatCoinTasksMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatCoinTasksProxy = this.getProxy(PlatCoinTasksProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
