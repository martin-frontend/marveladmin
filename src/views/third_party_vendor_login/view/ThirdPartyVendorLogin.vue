<template>
    <div class="content">
        <ThirdPartyVendorLoginDialog v-if="myProxy.dialogData.bShow"/>
        <ThirdPartyVendorLoginHeader/>
        <ThirdPartyVendorLoginBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ThirdPartyVendorLoginMediator from "@/views/third_party_vendor_login/mediator/ThirdPartyVendorLoginMediator";
import ThirdPartyVendorLoginProxy from "@/views/third_party_vendor_login/proxy/ThirdPartyVendorLoginProxy";
import { Component } from "vue-property-decorator";
import ThirdPartyVendorLoginDialog from "./ThirdPartyVendorLoginDialog.vue";
import ThirdPartyVendorLoginHeader from "./ThirdPartyVendorLoginHeader.vue";
import ThirdPartyVendorLoginBody from "./ThirdPartyVendorLoginBody.vue";

@Component({
    components: {
        ThirdPartyVendorLoginDialog,
        ThirdPartyVendorLoginHeader,
        ThirdPartyVendorLoginBody,
    }
})
export default class ThirdPartyVendorLogin extends AbstractView {

    constructor() {
        super(ThirdPartyVendorLoginMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ThirdPartyVendorLoginProxy = this.getProxy(ThirdPartyVendorLoginProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
