<template>
    <div class="content">
        <PlatEmailVendorHeader/>
        <PlatEmailVendorBody/>
        <PlatEmailVendorDialog/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatEmailVendorMediator from "@/views/plat_email_vendor/mediator/PlatEmailVendorMediator";
import { Component } from "vue-property-decorator";
import PlatEmailVendorHeader from "./PlatEmailVendorHeader.vue";
import PlatEmailVendorBody from "./PlatEmailVendorBody.vue";
import PlatEmailVendorDialog from "./PlatEmailVendorDialog.vue";

@Component({
    components: {
        PlatEmailVendorHeader,
        PlatEmailVendorBody,
        PlatEmailVendorDialog
    },
})
export default class PlatEmailVendor extends AbstractView {

    constructor() {
        super(PlatEmailVendorMediator);
    }

    destroyed(){
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
