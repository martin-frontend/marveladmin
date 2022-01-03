<template>
    <div class="content">
        <StatisticUserPromotionDaysIndexHeader />
        <StatisticUserPromotionDaysIndexBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticUserPromotionDaysIndexMediator from "@/views/statistic_user_promotion_days_index/mediator/StatisticUserPromotionDaysIndexMediator";
import StatisticUserPromotionDaysIndexProxy from "@/views/statistic_user_promotion_days_index/proxy/StatisticUserPromotionDaysIndexProxy";
import { Component } from "vue-property-decorator";
import StatisticUserPromotionDaysIndexHeader from "./StatisticUserPromotionDaysIndexHeader.vue";
import StatisticUserPromotionDaysIndexBody from "./StatisticUserPromotionDaysIndexBody.vue";

@Component({
    components: {
        StatisticUserPromotionDaysIndexHeader,
        StatisticUserPromotionDaysIndexBody,
    },
})
export default class StatisticUserPromotionDaysIndex extends AbstractView {
    constructor() {
        super(StatisticUserPromotionDaysIndexMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticUserPromotionDaysIndexProxy = this.getProxy(StatisticUserPromotionDaysIndexProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
