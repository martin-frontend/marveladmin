<template>
    <div class="content">
        <!-- <BlockRechargeAddressDialog v-if="myProxy.dialogData.bShow"/> -->
        <BlockRechargeAddressHeader />
        <BlockRechargeAddressBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockRechargeAddressMediator from "@/views/block_recharge_address/mediator/BlockRechargeAddressMediator";
import BlockRechargeAddressProxy from "../proxy/BlockRechargeAddressProxy";
import { Component } from "vue-property-decorator";
// import BlockRechargeAddressDialog from "./BlockRechargeAddressDialog.vue";
import BlockRechargeAddressHeader from "./BlockRechargeAddressHeader.vue";
import BlockRechargeAddressBody from "./BlockRechargeAddressBody.vue";

@Component({
    components: {
        // BlockRechargeAddressDialog,
        BlockRechargeAddressHeader,
        BlockRechargeAddressBody,
    },
})
export default class BlockRechargeAddress extends AbstractView {
    constructor() {
        super(BlockRechargeAddressMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockRechargeAddressProxy = this.getProxy(BlockRechargeAddressProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
