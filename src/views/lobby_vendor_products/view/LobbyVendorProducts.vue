<template>
    <div class="content">
        <LobbyVendorProductsHeader />
        <LobbyVendorProductsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import LobbyVendorProductsMediator from "@/views/lobby_vendor_products/mediator/LobbyVendorProductsMediator";
import LobbyVendorProductsProxy from "@/views/lobby_vendor_products/proxy/LobbyVendorProductsProxy";
import { Component } from "vue-property-decorator";
import LobbyVendorProductsHeader from "./LobbyVendorProductsHeader.vue";
import LobbyVendorProductsBody from "./LobbyVendorProductsBody.vue";

@Component({
    components: {
        LobbyVendorProductsHeader,
        LobbyVendorProductsBody,
    },
})
export default class LobbyVendorProducts extends AbstractView {
    constructor() {
        super(LobbyVendorProductsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: LobbyVendorProductsProxy = this.getProxy(LobbyVendorProductsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
