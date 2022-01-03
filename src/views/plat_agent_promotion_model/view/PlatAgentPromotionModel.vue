<template>
    <div class="content">
        <PlatAgentPromotionModelDialog/>
        <PlatAgentPromotionModelHeader/>
        <PlatAgentPromotionModelBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAgentPromotionModelMediator from "@/views/plat_agent_promotion_model/mediator/PlatAgentPromotionModelMediator";
import { Component } from "vue-property-decorator";
import PlatAgentPromotionModelDialog from "./PlatAgentPromotionModelDialog.vue";
import PlatAgentPromotionModelHeader from "./PlatAgentPromotionModelHeader.vue";
import PlatAgentPromotionModelBody from "./PlatAgentPromotionModelBody.vue";

@Component({
    components: {
        PlatAgentPromotionModelDialog,
        PlatAgentPromotionModelHeader,
        PlatAgentPromotionModelBody,
    }
})
export default class PlatAgentPromotionModel extends AbstractView {

    constructor() {
        super(PlatAgentPromotionModelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
