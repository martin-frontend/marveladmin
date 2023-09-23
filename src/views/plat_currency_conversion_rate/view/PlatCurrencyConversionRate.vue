<template>
    <div class="content">
        <PlatCurrencyConversionRateDialog v-if="myProxy.dialogData.bShow" />
        <PlatCurrencyConversionRateLogDialog v-if="myProxy.logDialogData.bShow" />
        <PlatCurrencyConversionRateHeader />
        <PlatCurrencyConversionRateBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatCurrencyConversionRateMediator from "@/views/plat_currency_conversion_rate/mediator/PlatCurrencyConversionRateMediator";
import PlatCurrencyConversionRateProxy from "../proxy/PlatCurrencyConversionRateProxy";
import { Component } from "vue-property-decorator";
import PlatCurrencyConversionRateDialog from "./PlatCurrencyConversionRateDialog.vue";
import PlatCurrencyConversionRateHeader from "./PlatCurrencyConversionRateHeader.vue";
import PlatCurrencyConversionRateBody from "./PlatCurrencyConversionRateBody.vue";
import PlatCurrencyConversionRateLogDialog from "./PlatCurrencyConversionRateLogDialog.vue";

@Component({
    components: {
        PlatCurrencyConversionRateDialog,
        PlatCurrencyConversionRateHeader,
        PlatCurrencyConversionRateBody,
        PlatCurrencyConversionRateLogDialog,
    },
})
export default class PlatCurrencyConversionRate extends AbstractView {
    constructor() {
        super(PlatCurrencyConversionRateMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatCurrencyConversionRateProxy = this.getProxy(PlatCurrencyConversionRateProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
