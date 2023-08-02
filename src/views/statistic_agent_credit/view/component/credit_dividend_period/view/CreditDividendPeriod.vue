<template>
    <div class="content">
        <CreditDividendPeriodDialog v-if="myProxy.dialogData.bShow"/>
        <CreditDividendPeriodHeader/>
        <CreditDividendPeriodBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import CreditDividendPeriodMediator from "../mediator/CreditDividendPeriodMediator";
import CreditDividendPeriodProxy from "../proxy/CreditDividendPeriodProxy";
import { Component, Prop } from "vue-property-decorator";
import CreditDividendPeriodDialog from "./CreditDividendPeriodDialog.vue";
import CreditDividendPeriodHeader from "./CreditDividendPeriodHeader.vue";
import CreditDividendPeriodBody from "./CreditDividendPeriodBody.vue";

@Component({
    components: {
        CreditDividendPeriodDialog,
        CreditDividendPeriodHeader,
        CreditDividendPeriodBody,
    }
})
export default class CreditDividendPeriod extends AbstractView {
    @Prop()
    plat_id!: string;

    constructor() {
        super(CreditDividendPeriodMediator);
        this.myProxy.listQuery.plat_id = this.plat_id;
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: CreditDividendPeriodProxy = this.getProxy(CreditDividendPeriodProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
