<template>
    <div class="content">
        <ExchangeChannelDialog v-if="myProxy.dialogData.bShow" />
        <ExchangeChannelHeader />
        <ExchangeChannelBody />
        <PayMethodDialog v-if="myProxy.payMethodDialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ExchangeChannelMediator from "@/views/exchange_channel/mediator/ExchangeChannelMediator";
import ExchangeChannelProxy from "../proxy/ExchangeChannelProxy";
import { Component } from "vue-property-decorator";
import ExchangeChannelDialog from "./ExchangeChannelDialog.vue";
import ExchangeChannelHeader from "./ExchangeChannelHeader.vue";
import ExchangeChannelBody from "./ExchangeChannelBody.vue";
import PayMethodDialog from "./components/PayMethodDialog.vue";

@Component({
    components: {
        ExchangeChannelDialog,
        ExchangeChannelHeader,
        ExchangeChannelBody,
        PayMethodDialog,
    },
})
export default class ExchangeChannel extends AbstractView {
    constructor() {
        super(ExchangeChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }

    // proxy
    private myProxy: ExchangeChannelProxy = this.getProxy(ExchangeChannelProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
