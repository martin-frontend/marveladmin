<template>
    <div class="content coin_wallet">
        <CoinWalletHeader />
        <CoinWalletBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import CoinWalletMediator from "@/views/coin_wallet/mediator/CoinWalletMediator";
import { Component } from "vue-property-decorator";
import CoinWalletHeader from "./CoinWalletHeader.vue";
import CoinWalletBody from "./CoinWalletBody.vue";
import CoinWalletProxy from "../proxy/CoinWalletProxy";

@Component({
    components: {
        CoinWalletHeader,
        CoinWalletBody,
    },
})
export default class CoinWallet extends AbstractView {
    // proxy
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);

    constructor() {
        super(CoinWalletMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
