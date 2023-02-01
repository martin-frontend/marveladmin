<template>
    <div class="content">
        <StatisticAgentCreditFilterDialog v-if="myProxy.dialogData.bShow" />
        <StatisticAgentCreditHeader />
        <StatisticAgentCreditBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticAgentCreditMediator from "@/views/statistic_agent_credit/mediator/StatisticAgentCreditMediator";
import StatisticAgentCreditProxy from "@/views/statistic_agent_credit/proxy/StatisticAgentCreditProxy";
import { Component } from "vue-property-decorator";
import StatisticAgentCreditFilterDialog from "./StatisticAgentCreditFilterDialog.vue";
import StatisticAgentCreditHeader from "./StatisticAgentCreditHeader.vue";
import StatisticAgentCreditBody from "./StatisticAgentCreditBody.vue";

@Component({
    components: {
        StatisticAgentCreditFilterDialog,
        StatisticAgentCreditHeader,
        StatisticAgentCreditBody,
    },
})
export default class StatisticAgentCredit extends AbstractView {
    constructor() {
        super(StatisticAgentCreditMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticAgentCreditProxy = this.getProxy(StatisticAgentCreditProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
