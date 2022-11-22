<template>
    <div class="content">
        <PlatAgentBonusDialog v-if="myProxy.dialogData.bShow" />
        <PlatAgentBonusHeader />
        <PlatAgentBonusBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAgentBonusMediator from "@/views/plat_agent_bonus/mediator/PlatAgentBonusMediator";
import PlatAgentBonusProxy from "@/views/plat_agent_bonus/proxy/PlatAgentBonusProxy";
import { Component } from "vue-property-decorator";
import PlatAgentBonusDialog from "./PlatAgentBonusDialog.vue";
import PlatAgentBonusHeader from "./PlatAgentBonusHeader.vue";
import PlatAgentBonusBody from "./PlatAgentBonusBody.vue";

@Component({
    components: {
        PlatAgentBonusDialog,
        PlatAgentBonusHeader,
        PlatAgentBonusBody,
    },
})
export default class PlatAgentBonus extends AbstractView {
    constructor() {
        super(PlatAgentBonusMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatAgentBonusProxy = this.getProxy(PlatAgentBonusProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
