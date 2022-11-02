<template>
    <div class="content">
        <StatisticCreditDialog v-if="myProxy.dialogData.bShow"/>
        <StatisticCreditHeader/>
        <StatisticCreditBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticCreditMediator from "@/views/statistic_credit/mediator/StatisticCreditMediator";
import StatisticCreditProxy from "@/views/statistic_credit/proxy/StatisticCreditProxy";
import { Component } from "vue-property-decorator";
import StatisticCreditDialog from "./StatisticCreditDialog.vue";
import StatisticCreditHeader from "./StatisticCreditHeader.vue";
import StatisticCreditBody from "./StatisticCreditBody.vue";

@Component({
    components: {
        StatisticCreditDialog,
        StatisticCreditHeader,
        StatisticCreditBody,
    }
})
export default class StatisticCredit extends AbstractView {

    constructor() {
        super(StatisticCreditMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticCreditProxy = this.getProxy(StatisticCreditProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
