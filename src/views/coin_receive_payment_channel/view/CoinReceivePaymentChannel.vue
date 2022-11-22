<template>
    <div class="content coin_receive_payment_channel">
        <CoinReceivePaymentChannelDialog />
        <CoinReceivePaymentChannelHeader />
        <CoinReceivePaymentChannelBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import CoinReceivePaymentChannelMediator from "@/views/coin_receive_payment_channel/mediator/CoinReceivePaymentChannelMediator";
import { Component } from "vue-property-decorator";
import CoinReceivePaymentChannelDialog from "./CoinReceivePaymentChannelDialog.vue";
import CoinReceivePaymentChannelHeader from "./CoinReceivePaymentChannelHeader.vue";
import CoinReceivePaymentChannelBody from "./CoinReceivePaymentChannelBody.vue";

@Component({
    components: {
        CoinReceivePaymentChannelDialog,
        CoinReceivePaymentChannelHeader,
        CoinReceivePaymentChannelBody,
    },
})
export default class CoinReceivePaymentChannel extends AbstractView {
    constructor() {
        super(CoinReceivePaymentChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
