<template>
    <div class="content">
        <VipReplenishRechargeOrderHeader />
        <VipReplenishRechargeOrderBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VipReplenishRechargeOrderMediator from "@/views/vip_replenish_recharge_order/mediator/VipReplenishRechargeOrderMediator";
import { Component } from "vue-property-decorator";
import VipReplenishRechargeOrderHeader from "./VipReplenishRechargeOrderHeader.vue";
import VipReplenishRechargeOrderBody from "./VipReplenishRechargeOrderBody.vue";

@Component({
    components: {
        VipReplenishRechargeOrderHeader,
        VipReplenishRechargeOrderBody,
    },
})
export default class VipReplenishRechargeOrder extends AbstractView {
    constructor() {
        super(VipReplenishRechargeOrderMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
