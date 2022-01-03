<template>
    <div class="content plat_vendors_wallet">
        <PlatVendorsWalletHeader />
        <PlatVendorsWalletBody />

        <!-- 厂商类弹窗 -->
        <PlatVendorsWalletDialog v-if="myProxy.vendorDialogData.create.bShow" />
        <VendorSettingDialog v-if="myProxy.vendorDialogData.setting.bShow" />
        <VendorLogDialog v-if="myProxy.vendorDialogData.log.bShow" />
        <VendorWalletDialog v-if="myProxy.vendorDialogData.wallet.bShow" />
        <VendorLimitDialog v-if="myProxy.vendorDialogData.limit.bShow" />
        <!-- 公共 -->
        <PublicLogDialog v-if="myProxy.publicDialogData.log.bShow" />
        <PublicLogDialog v-if="myProxy.publicDialogData.log.bShow" />
        <PublicWalletDialog v-if="myProxy.publicDialogData.wallet.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatVendorsWalletMediator from "@/views/plat_vendors_wallet/mediator/PlatVendorsWalletMediator";
import PlatVendorsWalletProxy from "@/views/plat_vendors_wallet/proxy/PlatVendorsWalletProxy";
import { Component } from "vue-property-decorator";
import PlatVendorsWalletDialog from "./PlatVendorsWalletDialog.vue";
import PlatVendorsWalletHeader from "./PlatVendorsWalletHeader.vue";
import PlatVendorsWalletBody from "./PlatVendorsWalletBody.vue";
import VendorSettingDialog from "./components/VendorSettingDialog.vue";
import VendorLogDialog from "./components/VendorLogDialog.vue";
import VendorWalletDialog from "./components/VendorWalletDialog.vue";
import VendorLimitDialog from "./components/VendorLimitDialog.vue";
import PublicLogDialog from "./components/PublicLogDialog.vue";
import PublicWalletDialog from "./components/PublicWalletDialog.vue";

@Component({
    components: {
        PlatVendorsWalletDialog,
        PlatVendorsWalletHeader,
        PlatVendorsWalletBody,
        VendorSettingDialog,
        VendorLogDialog,
        VendorWalletDialog,
        VendorLimitDialog,
        PublicLogDialog,
        PublicWalletDialog,
    },
})
export default class PlatVendorsWallet extends AbstractView {
    constructor() {
        super(PlatVendorsWalletMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
