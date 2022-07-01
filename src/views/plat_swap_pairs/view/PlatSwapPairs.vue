<template>
    <div class="content">
        <PlatSwapPairsDialog v-if="myProxy.dialogData.bShow" />
        <PlatSwapPairsHeader />
        <PlatSwapPairsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatSwapPairsMediator from "@/views/plat_swap_pairs/mediator/PlatSwapPairsMediator";
import PlatSwapPairsProxy from "@/views/plat_swap_pairs/proxy/PlatSwapPairsProxy";
import { Component } from "vue-property-decorator";
import PlatSwapPairsDialog from "./PlatSwapPairsDialog.vue";
import PlatSwapPairsHeader from "./PlatSwapPairsHeader.vue";
import PlatSwapPairsBody from "./PlatSwapPairsBody.vue";

@Component({
    components: {
        PlatSwapPairsDialog,
        PlatSwapPairsHeader,
        PlatSwapPairsBody,
    },
})
export default class PlatSwapPairs extends AbstractView {
    constructor() {
        super(PlatSwapPairsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatSwapPairsProxy = this.getProxy(PlatSwapPairsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
