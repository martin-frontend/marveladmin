<template>
    <div class="content">
        <ExchangeChannelMethodDialog/>
        <ExchangeChannelMethodHeader/>
        <ExchangeChannelMethodBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ExchangeChannelMethodMediator from "@/views/exchange_channel_method/mediator/ExchangeChannelMethodMediator";
import { Component } from "vue-property-decorator";
import ExchangeChannelMethodDialog from "./ExchangeChannelMethodDialog.vue";
import ExchangeChannelMethodHeader from "./ExchangeChannelMethodHeader.vue";
import ExchangeChannelMethodBody from "./ExchangeChannelMethodBody.vue";

@Component({
    components: {
        ExchangeChannelMethodDialog,
        ExchangeChannelMethodHeader,
        ExchangeChannelMethodBody,
    }
})
export default class ExchangeChannelMethod extends AbstractView {

    constructor() {
        super(ExchangeChannelMethodMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
