<template>
    <div class="content">
        <PlatAssetWalletHeader />
        <PlatAssetWalletBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAssetWalletMediator from "@/views/plat_asset_wallet/mediator/PlatAssetWalletMediator";
import PlatAssetWalletProxy from "@/views/plat_asset_wallet/proxy/PlatAssetWalletProxy";
import { Component } from "vue-property-decorator";
import PlatAssetWalletHeader from "./PlatAssetWalletHeader.vue";
import PlatAssetWalletBody from "./PlatAssetWalletBody.vue";

@Component({
    components: {
        PlatAssetWalletHeader,
        PlatAssetWalletBody,
    },
})
export default class PlatAssetWallet extends AbstractView {
    constructor() {
        super(PlatAssetWalletMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatAssetWalletProxy = this.getProxy(PlatAssetWalletProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
