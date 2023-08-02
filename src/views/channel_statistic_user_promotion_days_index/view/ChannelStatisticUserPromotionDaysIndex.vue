<template>
    <div class="content">
        <StatisticUserPromotionDaysIndexHeader />
        <StatisticUserPromotionDaysIndexBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticUserPromotionDaysIndexMediator from "@/views/channel_statistic_user_promotion_days_index/mediator/ChannelStatisticUserPromotionDaysIndexMediator";
import ChannelStatisticUserPromotionDaysIndexProxy from "@/views/channel_statistic_user_promotion_days_index/proxy/ChannelStatisticUserPromotionDaysIndexProxy";
import { Component } from "vue-property-decorator";
import StatisticUserPromotionDaysIndexHeader from "@/views/statistic_user_promotion_days_index/view/StatisticUserPromotionDaysIndexHeader.vue";
import StatisticUserPromotionDaysIndexBody from "@/views/statistic_user_promotion_days_index/view/StatisticUserPromotionDaysIndexBody.vue";

@Component({
    components: {
        StatisticUserPromotionDaysIndexHeader,
        StatisticUserPromotionDaysIndexBody,
    },
})
export default class ChannelStatisticUserPromotionDaysIndex extends AbstractView {
    constructor() {
        super(ChannelStatisticUserPromotionDaysIndexMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticUserPromotionDaysIndexProxy = this.getProxy(
        ChannelStatisticUserPromotionDaysIndexProxy
    );
}
</script>

<style scoped lang="scss"></style>
