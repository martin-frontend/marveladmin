<template>
    <div class="content">
        <PlatProfitTaxDialog v-if="myProxy.dialogData.bShow"/>
        <PlatProfitTaxHeader/>
        <PlatProfitTaxBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatProfitTaxMediator from "@/views/plat_profit_tax/mediator/PlatProfitTaxMediator";
import PlatProfitTaxProxy from "../proxy/PlatProfitTaxProxy";
import { Component } from "vue-property-decorator";
import PlatProfitTaxDialog from "./PlatProfitTaxDialog.vue";
import PlatProfitTaxHeader from "./PlatProfitTaxHeader.vue";
import PlatProfitTaxBody from "./PlatProfitTaxBody.vue";

@Component({
    components: {
        PlatProfitTaxDialog,
        PlatProfitTaxHeader,
        PlatProfitTaxBody,
    }
})
export default class PlatProfitTax extends AbstractView {

    constructor() {
        super(PlatProfitTaxMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatProfitTaxProxy = this.getProxy(PlatProfitTaxProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
