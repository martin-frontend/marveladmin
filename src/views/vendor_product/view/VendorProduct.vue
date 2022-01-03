<template>
    <div class="content">
        <VendorProductDialog/>
        <VendorProductHeader/>
        <VendorProductBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VendorProductMediator from "@/views/vendor_product/mediator/VendorProductMediator";
import { Component } from "vue-property-decorator";
import VendorProductDialog from "./VendorProductDialog.vue";
import VendorProductHeader from "./VendorProductHeader.vue";
import VendorProductBody from "./VendorProductBody.vue";

@Component({
    components: {
        VendorProductDialog,
        VendorProductHeader,
        VendorProductBody,
    }
})
export default class VendorProduct extends AbstractView {

    constructor() {
        super(VendorProductMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
