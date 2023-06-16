<template>
    <div class="content">
        <VipReplenishRechargeDialog />
        <VipReplenishRechargeBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VipReplenishRechargeMediator from "@/views/vip_replenish_recharge/mediator/VipReplenishRechargeMediator";
import { Component } from "vue-property-decorator";
import VipReplenishRechargeDialog from "./VipReplenishRechargeDialog.vue";
import VipReplenishRechargeBody from "./VipReplenishRechargeBody.vue";

@Component({
    components: {
        VipReplenishRechargeDialog,
        VipReplenishRechargeBody,
    },
})
export default class VipReplenishRecharge extends AbstractView {
    constructor() {
        super(VipReplenishRechargeMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
