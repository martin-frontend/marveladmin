<template>
    <div class="content">
        <PromotionExtraConfigDialog />
        <PlatAgentDialog />
        <PlatAgentHeader />
        <PlatAgentBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAgentMediator from "@/views/plat_agent/mediator/PlatAgentMediator";
import { Component } from "vue-property-decorator";
import PlatAgentDialog from "./PlatAgentDialog.vue";
import PlatAgentHeader from "./PlatAgentHeader.vue";
import PlatAgentBody from "./PlatAgentBody.vue";
import PromotionExtraConfigDialog from "./components/PromotionExtraConfigDialog.vue";

@Component({
    components: {
        PlatAgentDialog,
        PlatAgentHeader,
        PlatAgentBody,
        PromotionExtraConfigDialog,
    },
})
export default class PlatAgent extends AbstractView {
    constructor() {
        super(PlatAgentMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
