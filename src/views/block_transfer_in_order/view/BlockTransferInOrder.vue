<template>
    <div class="content">
        <!-- <BlockTransferInOrderDialog v-if="myProxy.dialogData.bShow"/> -->
        <BlockTransferInOrderHeader/>
        <BlockTransferInOrderBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockTransferInOrderMediator from "@/views/block_transfer_in_order/mediator/BlockTransferInOrderMediator";
import BlockTransferInOrderProxy from "../proxy/BlockTransferInOrderProxy";
import { Component } from "vue-property-decorator";
import BlockTransferInOrderDialog from "./BlockTransferInOrderDialog.vue";
import BlockTransferInOrderHeader from "./BlockTransferInOrderHeader.vue";
import BlockTransferInOrderBody from "./BlockTransferInOrderBody.vue";

@Component({
    components: {
        BlockTransferInOrderDialog,
        BlockTransferInOrderHeader,
        BlockTransferInOrderBody,
    }
})
export default class BlockTransferInOrder extends AbstractView {

    constructor() {
        super(BlockTransferInOrderMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockTransferInOrderProxy = this.getProxy(BlockTransferInOrderProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
