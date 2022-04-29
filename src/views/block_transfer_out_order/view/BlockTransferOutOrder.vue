<template>
    <div class="content">
        <BlockTransferOutOrderDialog v-if="myProxy.dialogData.bShow"/>
        <BlockTransferOutOrderHeader/>
        <BlockTransferOutOrderBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockTransferOutOrderMediator from "@/views/block_transfer_out_order/mediator/BlockTransferOutOrderMediator";
import BlockTransferOutOrderProxy from "../proxy/BlockTransferOutOrderProxy";
import { Component } from "vue-property-decorator";
import BlockTransferOutOrderDialog from "./BlockTransferOutOrderDialog.vue";
import BlockTransferOutOrderHeader from "./BlockTransferOutOrderHeader.vue";
import BlockTransferOutOrderBody from "./BlockTransferOutOrderBody.vue";

@Component({
    components: {
        BlockTransferOutOrderDialog,
        BlockTransferOutOrderHeader,
        BlockTransferOutOrderBody,
    }
})
export default class BlockTransferOutOrder extends AbstractView {

    constructor() {
        super(BlockTransferOutOrderMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockTransferOutOrderProxy = this.getProxy(BlockTransferOutOrderProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
