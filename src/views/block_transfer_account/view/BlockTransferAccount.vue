<template>
    <div class="content">
        <BlockTransferAccountDialog v-if="myProxy.dialogData.bShow"/>
        <BlockTransferAccountHeader/>
        <BlockTransferAccountBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockTransferAccountMediator from "@/views/block_transfer_account/mediator/BlockTransferAccountMediator";
import BlockTransferAccountProxy from "@/views/block_transfer_account/proxy/BlockTransferAccountProxy";
import { Component } from "vue-property-decorator";
import BlockTransferAccountDialog from "./BlockTransferAccountDialog.vue";
import BlockTransferAccountHeader from "./BlockTransferAccountHeader.vue";
import BlockTransferAccountBody from "./BlockTransferAccountBody.vue";

@Component({
    components: {
        BlockTransferAccountDialog,
        BlockTransferAccountHeader,
        BlockTransferAccountBody,
    }
})
export default class BlockTransferAccount extends AbstractView {

    constructor() {
        super(BlockTransferAccountMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockTransferAccountProxy = this.getProxy(BlockTransferAccountProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
