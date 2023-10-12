<template>
    <div class="content">
        <PlatUserAgentBonusDialog v-if="myProxy.dialogData.bShow" />
        <PlatUserAgentBonusHeader />
        <PlatUserAgentBonusBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserAgentBonusMediator from "@/views/plat_user_agent_bonus/mediator/PlatUserAgentBonusMediator";
import PlatUserAgentBonusProxy from "../proxy/PlatUserAgentBonusProxy";
import { Component } from "vue-property-decorator";
import PlatUserAgentBonusDialog from "./PlatUserAgentBonusDialog.vue";
import PlatUserAgentBonusHeader from "./PlatUserAgentBonusHeader.vue";
import PlatUserAgentBonusBody from "./PlatUserAgentBonusBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatUserAgentBonusDialog,
        PlatUserAgentBonusHeader,
        PlatUserAgentBonusBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class PlatUserAgentBonus extends AbstractView {
    constructor() {
        super(PlatUserAgentBonusMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatUserAgentBonusProxy = this.getProxy(PlatUserAgentBonusProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
