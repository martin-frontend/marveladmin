<template>
    <div class="content plat_agent_bind">
        <PlatAgentBindHeader />
        <PlatAgentBindBody />
        <PromotionFloorDialog v-if="myProxy.promotionFloorDialogData.bShow" />
        <BindDialog v-if="myProxy.bindDialogData.bShow" />
        <AgentBonusDialog v-if="myProxy.agentBonusDialogData.bShow" />
        <BonusConfigDialog v-if="myProxy.bonusConfigDialogData.bShow" />
        <RemarkDialog />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import PlatAgentBindMediator from "@/views/plat_agent_bind/mediator/PlatAgentBindMediator";
import PlatAgentBindProxy from "@/views/plat_agent_bind/proxy/PlatAgentBindProxy";
import { Component } from "vue-property-decorator";
import PlatAgentBindHeader from "./PlatAgentBindHeader.vue";
import PlatAgentBindBody from "./PlatAgentBindBody.vue";
import PromotionFloorDialog from "./component/PromotionFloorDialog.vue";
import BindDialog from "./component/BindDialog.vue";
import AgentBonusDialog from "./component/AgentBonusDialog.vue";
import BonusConfigDialog from "./component/BonusConfigDialog.vue";
import ProgressDialog from "./component/ProgressDialog.vue";
import FieldSelectionDialog from "./component/FieldSelectionDialog.vue";
import RemarkDialog from "./component/RemarkDialog.vue";

@Component({
    components: {
        PlatAgentBindHeader,
        PlatAgentBindBody,
        PromotionFloorDialog,
        BindDialog,
        AgentBonusDialog,
        BonusConfigDialog,
        ProgressDialog,
        FieldSelectionDialog,
        RemarkDialog,
    },
})
export default class PlatAgentBind extends AbstractView {
    constructor() {
        super(PlatAgentBindMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
