<template>
    <div class="content">
        <VendorDialog />
        <VendorHeader />
        <VendorBody />
        <VendorTestDialog />
        <VendorCoinDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VendorMediator from "@/views/vendor/mediator/VendorMediator";
import { Component } from "vue-property-decorator";
import VendorDialog from "./VendorDialog.vue";
import VendorHeader from "./VendorHeader.vue";
import VendorBody from "./VendorBody.vue";
import VendorTestDialog from "./components/VendorTestDialog.vue";
import VendorCoinDialog from "./components/VendorCoinDialog.vue";

@Component({
    components: {
        VendorDialog,
        VendorHeader,
        VendorBody,
        VendorTestDialog,
        VendorCoinDialog,
    },
})
export default class Vendor extends AbstractView {
    constructor() {
        super(VendorMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
