<template>
    <div class="content">
        <VipRechargeDialog />
        <VipRechargeBody ref="body" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VipRechargeMediator from "@/views/vip_recharge/mediator/VipRechargeMediator";
import { Component } from "vue-property-decorator";
import VipRechargeDialog from "./VipRechargeDialog.vue";
import VipRechargeBody from "./VipRechargeBody.vue";

@Component({
    components: {
        VipRechargeDialog,
        VipRechargeBody,
    },
})
export default class VipRecharge extends AbstractView {
    constructor() {
        super(VipRechargeMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
