<template>
    <div class="content">
        <RechargeChannelsPaymethodsDialog />
        <RechargeChannelsPaymethodsHeader />
        <RechargeChannelsPaymethodsBody />
        <RechargeChannelsPaymethodsEditDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import RechargeChannelsPaymethodsMediator from "@/views/recharge_channels_paymethods/mediator/RechargeChannelsPaymethodsMediator";
import { Component } from "vue-property-decorator";
import RechargeChannelsPaymethodsDialog from "./RechargeChannelsPaymethodsDialog.vue";
import RechargeChannelsPaymethodsHeader from "./RechargeChannelsPaymethodsHeader.vue";
import RechargeChannelsPaymethodsBody from "./RechargeChannelsPaymethodsBody.vue";
import RechargeChannelsPaymethodsEditDialog from "./RechargeChannelsPaymethodsEditDialog.vue";

@Component({
    components: {
        RechargeChannelsPaymethodsDialog,
        RechargeChannelsPaymethodsHeader,
        RechargeChannelsPaymethodsBody,
        RechargeChannelsPaymethodsEditDialog,
    },
})
export default class RechargeChannelsPaymethods extends AbstractView {
    constructor() {
        super(RechargeChannelsPaymethodsMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.recharge_channel_component {
    margin: 16px 0;
    ::v-deep .el-dialog__body {
        padding-top: 0;
    }
}
</style>
