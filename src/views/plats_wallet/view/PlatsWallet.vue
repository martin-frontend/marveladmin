<template>
    <div>
        <PlatsWalletHeader />
        <PlatsWalletBody />
        <!-- <PlatsWalletDialog /> -->
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatsWalletMediator from "@/views/plats_wallet/mediator/PlatsWalletMediator";
import { Component } from "vue-property-decorator";
import PlatsWalletHeader from "./PlatsWalletHeader.vue";
import PlatsWalletBody from "./PlatsWalletBody.vue";
// import PlatsWalletDialog from "./PlatsWalletDialog.vue";

@Component({
    components: {
        PlatsWalletHeader,
        PlatsWalletBody,
        // PlatsWalletDialog,
    },
})
export default class PlatsWallet extends AbstractView {
    constructor() {
        super(PlatsWalletMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss"></style>
