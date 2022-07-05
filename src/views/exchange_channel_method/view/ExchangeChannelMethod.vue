<template>
    <div class="content">
        <ExchangeChannelMethodHeader />
        <ExchangeChannelMethodBody />
        <ExchangeChannelMethodDialog v-if="myProxy.dialogData.bShow" />
        <ExchangeChannelListDialog v-if="myProxy.dialogDataChannelData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ExchangeChannelMethodMediator from "@/views/exchange_channel_method/mediator/ExchangeChannelMethodMediator";
import { Component } from "vue-property-decorator";
import ExchangeChannelMethodDialog from "./ExchangeChannelMethodDialog.vue";
import ExchangeChannelMethodHeader from "./ExchangeChannelMethodHeader.vue";
import ExchangeChannelMethodBody from "./ExchangeChannelMethodBody.vue";
import ExchangeChannelListDialog from "./ExchangeChannelListDialog.vue";
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";

@Component({
    components: {
        ExchangeChannelMethodDialog,
        ExchangeChannelListDialog,
        ExchangeChannelMethodHeader,
        ExchangeChannelMethodBody,
    },
})
export default class ExchangeChannelMethod extends AbstractView {
    constructor() {
        super(ExchangeChannelMethodMediator);
    }
    // proxy
    private myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
