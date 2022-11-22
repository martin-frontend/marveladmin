<template>
    <div class="content">
        <BlockNetworkDialog v-if="myProxy.dialogData.bShow" />
        <BlockNetworkHeader />
        <BlockNetworkBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockNetworkMediator from "@/views/block_network/mediator/BlockNetworkMediator";
import BlockNetworkProxy from "../proxy/BlockNetworkProxy";
import { Component } from "vue-property-decorator";
import BlockNetworkDialog from "./BlockNetworkDialog.vue";
import BlockNetworkHeader from "./BlockNetworkHeader.vue";
import BlockNetworkBody from "./BlockNetworkBody.vue";

@Component({
    components: {
        BlockNetworkDialog,
        BlockNetworkHeader,
        BlockNetworkBody,
    },
})
export default class BlockNetwork extends AbstractView {
    constructor() {
        super(BlockNetworkMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockNetworkProxy = this.getProxy(BlockNetworkProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
