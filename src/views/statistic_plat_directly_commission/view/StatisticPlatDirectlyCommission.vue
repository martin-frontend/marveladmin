<template>
    <div class="content">
        <StatisticPlatDirectlyCommissionSettingDialog v-if="myProxy.dialogSettingData.bShow" />
        <StatisticPlatDirectlyCommissionDetailDialog v-if="myProxy.dialogDetailData.bShow" />
        <StatisticPlatDirectlyCommissionBonusDialog v-if="myProxy.dialogBonusData.bShow" />
        <StatisticPlatDirectlyCommissionChannelDialog v-if="myProxy.dialogChannelData.bShow" />
        <StatisticPlatDirectlyCommissionHeader />
        <StatisticPlatDirectlyCommissionBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticPlatDirectlyCommissionMediator from "@/views/statistic_plat_directly_commission/mediator/StatisticPlatDirectlyCommissionMediator";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import { Component } from "vue-property-decorator";
import StatisticPlatDirectlyCommissionSettingDialog from "./StatisticPlatDirectlyCommissionSettingDialog.vue";
import StatisticPlatDirectlyCommissionDetailDialog from "./StatisticPlatDirectlyCommissionDetailDialog.vue";
import StatisticPlatDirectlyCommissionBonusDialog from "./StatisticPlatDirectlyCommissionBonusDialog.vue";
import StatisticPlatDirectlyCommissionChannelDialog from "./StatisticPlatDirectlyCommissionChannelDialog.vue";
import StatisticPlatDirectlyCommissionHeader from "./StatisticPlatDirectlyCommissionHeader.vue";
import StatisticPlatDirectlyCommissionBody from "./StatisticPlatDirectlyCommissionBody.vue";

@Component({
    components: {
        StatisticPlatDirectlyCommissionSettingDialog,
        StatisticPlatDirectlyCommissionDetailDialog,
        StatisticPlatDirectlyCommissionBonusDialog,
        StatisticPlatDirectlyCommissionChannelDialog,
        StatisticPlatDirectlyCommissionHeader,
        StatisticPlatDirectlyCommissionBody,
    },
})
export default class StatisticPlatDirectlyCommission extends AbstractView {
    constructor() {
        super(StatisticPlatDirectlyCommissionMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
