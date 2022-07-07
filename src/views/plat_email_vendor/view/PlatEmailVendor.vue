<template>
    <div class="content">
        <PlatEmailVendorHeader />
        <PlatEmailVendorBody />
        <PlatEmailVendorDialog v-if="myProxy.dialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatEmailVendorMediator from "@/views/plat_email_vendor/mediator/PlatEmailVendorMediator";
import { Component } from "vue-property-decorator";
import PlatEmailVendorHeader from "./PlatEmailVendorHeader.vue";
import PlatEmailVendorBody from "./PlatEmailVendorBody.vue";
import PlatEmailVendorDialog from "./PlatEmailVendorDialog.vue";
import PlatEmailVendorProxy from "../proxy/PlatEmailVendorProxy";

@Component({
    components: {
        PlatEmailVendorHeader,
        PlatEmailVendorBody,
        PlatEmailVendorDialog,
    },
})
export default class PlatEmailVendor extends AbstractView {
    constructor() {
        super(PlatEmailVendorMediator);
    }
    // proxy
    myProxy: PlatEmailVendorProxy = this.getProxy(PlatEmailVendorProxy);

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
