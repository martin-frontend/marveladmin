<template>
    <div class="content">
        <VendorProductDialog />
        <VendorProductHeader />
        <VendorProductBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VendorProductMediator from "@/views/vendor_product/mediator/VendorProductMediator";
import { Component } from "vue-property-decorator";
import VendorProductDialog from "./VendorProductDialog.vue";
import VendorProductHeader from "./VendorProductHeader.vue";
import VendorProductBody from "./VendorProductBody.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import VendorProductProxy from "../proxy/VendorProductProxy";

@Component({
    components: {
        VendorProductDialog,
        VendorProductHeader,
        VendorProductBody,
        ProgressDialog,
        FieldSelectionDialog,
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
    myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
