<template>
    <div class="content">
        <PlatAgentManageBindHeader />
        <PlatAgentManageBindBody />
        <RemarkDialog />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAgentManageBindMediator from "@/views/plat_agent_manage_bind/mediator/PlatAgentManageBindMediator";
import PlatAgentManageBindProxy from "@/views/plat_agent_manage_bind/proxy/PlatAgentManageBindProxy";
import { Component } from "vue-property-decorator";
import PlatAgentManageBindDialog from "./PlatAgentManageBindDialog.vue";
import PlatAgentManageBindHeader from "./PlatAgentManageBindHeader.vue";
import PlatAgentManageBindBody from "./PlatAgentManageBindBody.vue";
import ProgressDialog from "./component/ProgressDialog.vue";
import FieldSelectionDialog from "./component/FieldSelectionDialog.vue";
import RemarkDialog from "./component/RemarkDialog.vue";

@Component({
    components: {
        PlatAgentManageBindDialog,
        PlatAgentManageBindHeader,
        PlatAgentManageBindBody,
        ProgressDialog,
        FieldSelectionDialog,
        RemarkDialog,
    },
})
export default class PlatAgentManageBind extends AbstractView {
    constructor() {
        super(PlatAgentManageBindMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatAgentManageBindProxy = this.getProxy(PlatAgentManageBindProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
