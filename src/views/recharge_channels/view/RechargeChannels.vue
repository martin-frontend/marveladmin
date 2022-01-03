<template>
    <div class="content">
        <RechargeChannelsDialog v-if="myProxy.dialogData.bShow" />
        <RechargeChannelsHeader />
        <RechargeChannelsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import RechargeChannelsMediator from "@/views/recharge_channels/mediator/RechargeChannelsMediator";
import RechargeChannelsProxy from "../proxy/RechargeChannelsProxy";
import { Component } from "vue-property-decorator";
import RechargeChannelsDialog from "./RechargeChannelsDialog.vue";
import RechargeChannelsHeader from "./RechargeChannelsHeader.vue";
import RechargeChannelsBody from "./RechargeChannelsBody.vue";

@Component({
    components: {
        RechargeChannelsDialog,
        RechargeChannelsHeader,
        RechargeChannelsBody,
    },
})
export default class RechargeChannels extends AbstractView {
    constructor() {
        super(RechargeChannelsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: RechargeChannelsProxy = this.getProxy(RechargeChannelsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
