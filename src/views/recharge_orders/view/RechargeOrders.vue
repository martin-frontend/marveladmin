<template>
    <div class="content recharge_orders">
        <RechargeOrdersDialog />
        <RechargeOrdersHeader />
        <RechargeOrdersBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import RechargeOrdersMediator from "@/views/recharge_orders/mediator/RechargeOrdersMediator";
import { Component } from "vue-property-decorator";
import RechargeOrdersDialog from "./RechargeOrdersDialog.vue";
import RechargeOrdersHeader from "./RechargeOrdersHeader.vue";
import RechargeOrdersBody from "./RechargeOrdersBody.vue";

@Component({
    components: {
        RechargeOrdersDialog,
        RechargeOrdersHeader,
        RechargeOrdersBody,
    },
})
export default class RechargeOrders extends AbstractView {
    constructor() {
        super(RechargeOrdersMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
