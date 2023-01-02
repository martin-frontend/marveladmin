<template>
    <div class="content">
        <MenuVendorProductsDialog v-if="myProxy.dialogData.bShow" />
        <MenuVendorProductsSortDialog v-if="myProxy.sortDialogData.bShow" />
        <MenuVendorProductsHeader />
        <MenuVendorProductsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import MenuVendorProductsMediator from "@/views/menu_vendor_products/mediator/MenuVendorProductsMediator";
import MenuVendorProductsProxy from "@/views/menu_vendor_products/proxy/MenuVendorProductsProxy";
import { Component } from "vue-property-decorator";
import MenuVendorProductsDialog from "./MenuVendorProductsDialog.vue";
import MenuVendorProductsHeader from "./MenuVendorProductsHeader.vue";
import MenuVendorProductsBody from "./MenuVendorProductsBody.vue";
import MenuVendorProductsSortDialog from "./MenuVendorProductsSortDialog.vue";

@Component({
    components: {
        MenuVendorProductsDialog,
        MenuVendorProductsHeader,
        MenuVendorProductsBody,
        MenuVendorProductsSortDialog,
    },
})
export default class MenuVendorProducts extends AbstractView {
    constructor() {
        super(MenuVendorProductsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: MenuVendorProductsProxy = this.getProxy(MenuVendorProductsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
