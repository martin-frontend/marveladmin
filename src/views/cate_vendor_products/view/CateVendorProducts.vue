<template>
    <div class="content">
        <CateVendorProductsDialog v-if="myProxy.dialogData.bShow" />
        <CateVendorProductsHeader />
        <CateVendorProductsBody />
        <CateVendorProductsGameTypeTagDialog v-if="myProxy.cateVendorProductsGameTypeTagDialog.bShow" />
        <GameTypeTagDialog v-if="myProxy.gameTypeDialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import CateVendorProductsMediator from "@/views/cate_vendor_products/mediator/CateVendorProductsMediator";
import CateVendorProductsProxy from "@/views/cate_vendor_products/proxy/CateVendorProductsProxy";
import { Component } from "vue-property-decorator";
import CateVendorProductsDialog from "./CateVendorProductsDialog.vue";
import CateVendorProductsHeader from "./CateVendorProductsHeader.vue";
import CateVendorProductsBody from "./CateVendorProductsBody.vue";
import CateVendorProductsGameTypeTagDialog from "./CateVendorProductsGameTypeTagDialog.vue";
import GameTypeTagDialog from "./GameTypeTagDialog.vue";

@Component({
    components: {
        CateVendorProductsDialog,
        CateVendorProductsHeader,
        CateVendorProductsBody,
        CateVendorProductsGameTypeTagDialog,
        GameTypeTagDialog,
    },
})
export default class CateVendorProducts extends AbstractView {
    constructor() {
        super(CateVendorProductsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
