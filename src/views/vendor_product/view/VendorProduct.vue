<template>
    <div class="content">
        <VendorProductDialog />
        <VendorProductHeader />
        <VendorProductBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VendorProductMediator from "@/views/vendor_product/mediator/VendorProductMediator";
import VendorProductProxy from "@/views/vendor_product/proxy/VendorProductProxy";
import { Component } from "vue-property-decorator";
import VendorProductDialog from "./VendorProductDialog.vue";
import VendorProductHeader from "./VendorProductHeader.vue";
import VendorProductBody from "./VendorProductBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";

@Component({
    components: {
        VendorProductDialog,
        VendorProductHeader,
        VendorProductBody,
        ProgressDialog,
    },
})
export default class VendorProduct extends AbstractView {
    constructor() {
        super(VendorProductMediator);
    }

    destroyed() {
        super.destroyed();
    }

    // proxy
    private myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
