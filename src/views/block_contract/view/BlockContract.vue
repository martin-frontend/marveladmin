<template>
    <div class="content">
        <BlockContractDialog v-if="myProxy.dialogData.bShow" />
        <BlockContractHeader />
        <BlockContractBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockContractMediator from "@/views/block_contract/mediator/BlockContractMediator";
import BlockContractProxy from "../proxy/BlockContractProxy";
import { Component } from "vue-property-decorator";
import BlockContractDialog from "./BlockContractDialog.vue";
import BlockContractHeader from "./BlockContractHeader.vue";
import BlockContractBody from "./BlockContractBody.vue";

@Component({
    components: {
        BlockContractDialog,
        BlockContractHeader,
        BlockContractBody,
    },
})
export default class BlockContract extends AbstractView {
    constructor() {
        super(BlockContractMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockContractProxy = this.getProxy(BlockContractProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
