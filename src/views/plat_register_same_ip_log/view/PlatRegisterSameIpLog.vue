<template>
    <div class="content">
        <PlatRegisterSameIpLogDialog v-if="myProxy.dialogData.bShow" />
        <PlatRegisterSameIpLogHeader />
        <PlatRegisterSameIpLogBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatRegisterSameIpLogMediator from "@/views/plat_register_same_ip_log/mediator/PlatRegisterSameIpLogMediator";
import PlatRegisterSameIpLogProxy from "@/views/plat_register_same_ip_log/proxy/PlatRegisterSameIpLogProxy";
import { Component } from "vue-property-decorator";
import PlatRegisterSameIpLogDialog from "./PlatRegisterSameIpLogDialog.vue";
import PlatRegisterSameIpLogHeader from "./PlatRegisterSameIpLogHeader.vue";
import PlatRegisterSameIpLogBody from "./PlatRegisterSameIpLogBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatRegisterSameIpLogDialog,
        PlatRegisterSameIpLogHeader,
        PlatRegisterSameIpLogBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class PlatRegisterSameIpLog extends AbstractView {
    constructor() {
        super(PlatRegisterSameIpLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatRegisterSameIpLogProxy = this.getProxy(PlatRegisterSameIpLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
