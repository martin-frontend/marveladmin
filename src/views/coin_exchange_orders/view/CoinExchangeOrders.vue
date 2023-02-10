<template>
    <div class="content">
        <CoinExchangeOrdersDialog v-if="myProxy.dialogData.bShow" />
        <CoinExchangeOrdersHeader />
        <CoinExchangeOrdersBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import CoinExchangeOrdersMediator from "@/views/coin_exchange_orders/mediator/CoinExchangeOrdersMediator";
import CoinExchangeOrdersProxy from "@/views/coin_exchange_orders/proxy/CoinExchangeOrdersProxy";
import { Component } from "vue-property-decorator";
import CoinExchangeOrdersDialog from "./CoinExchangeOrdersDialog.vue";
import CoinExchangeOrdersHeader from "./CoinExchangeOrdersHeader.vue";
import CoinExchangeOrdersBody from "./CoinExchangeOrdersBody.vue";

@Component({
    components: {
        CoinExchangeOrdersDialog,
        CoinExchangeOrdersHeader,
        CoinExchangeOrdersBody,
    },
})
export default class CoinExchangeOrders extends AbstractView {
    constructor() {
        super(CoinExchangeOrdersMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: CoinExchangeOrdersProxy = this.getProxy(CoinExchangeOrdersProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
