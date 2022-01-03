<template>
    <div class="content vip_receive_payment_channel">
        <VipReceivePaymentChannelHeader />
        <VipReceivePaymentChannelBody />
        <VipReceivePaymentChannelDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import VipReceivePaymentChannelMediator from "@/views/vip_receive_payment_channel/mediator/VipReceivePaymentChannelMediator";
import { Component } from "vue-property-decorator";
import VipReceivePaymentChannelDialog from "./VipReceivePaymentChannelDialog.vue";
import VipReceivePaymentChannelHeader from "./VipReceivePaymentChannelHeader.vue";
import VipReceivePaymentChannelBody from "./VipReceivePaymentChannelBody.vue";

@Component({
    components: {
        VipReceivePaymentChannelDialog,
        VipReceivePaymentChannelHeader,
        VipReceivePaymentChannelBody,
    },
})
export default class VipReceivePaymentChannel extends AbstractView {
    constructor() {
        super(VipReceivePaymentChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
