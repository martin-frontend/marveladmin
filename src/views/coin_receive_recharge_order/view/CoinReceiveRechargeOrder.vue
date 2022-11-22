<template>
    <div class="content coin_receive_recharge_order">
        <CoinReceiveRechargeOrderDialog />
        <CoinReceiveRechargeOrderHeader />
        <CoinReceiveRechargeOrderBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import CoinReceiveRechargeOrderMediator from "@/views/coin_receive_recharge_order/mediator/CoinReceiveRechargeOrderMediator";
import { Component } from "vue-property-decorator";
import CoinReceiveRechargeOrderDialog from "./CoinReceiveRechargeOrderDialog.vue";
import CoinReceiveRechargeOrderHeader from "./CoinReceiveRechargeOrderHeader.vue";
import CoinReceiveRechargeOrderBody from "./CoinReceiveRechargeOrderBody.vue";

@Component({
    components: {
        CoinReceiveRechargeOrderDialog,
        CoinReceiveRechargeOrderHeader,
        CoinReceiveRechargeOrderBody,
    },
})
export default class CoinReceiveRechargeOrder extends AbstractView {
    constructor() {
        super(CoinReceiveRechargeOrderMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
