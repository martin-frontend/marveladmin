<template>
    <div class="content">
        <VipReceiveRechargeOrderHeader />
        <VipReceiveRechargeOrderBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VipReceiveRechargeOrderMediator from "@/views/vip_receive_recharge_order/mediator/VipReceiveRechargeOrderMediator";
import { Component } from "vue-property-decorator";
import VipReceiveRechargeOrderHeader from "./VipReceiveRechargeOrderHeader.vue";
import VipReceiveRechargeOrderBody from "./VipReceiveRechargeOrderBody.vue";

@Component({
    components: {
        VipReceiveRechargeOrderHeader,
        VipReceiveRechargeOrderBody,
    },
})
export default class VipReceiveRechargeOrder extends AbstractView {
    constructor() {
        super(VipReceiveRechargeOrderMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
