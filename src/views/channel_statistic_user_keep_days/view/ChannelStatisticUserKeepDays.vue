<template>
    <div class="content">
        <StatisticUserKeepDaysHeader/>
        <StatisticUserKeepDaysBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelStatisticUserKeepDaysMediator from "@/views/channel_statistic_user_keep_days/mediator/ChannelStatisticUserKeepDaysMediator";
import ChannelStatisticUserKeepDaysProxy from "../proxy/ChannelStatisticUserKeepDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticUserKeepDaysHeader from "@/views/statistic_user_keep_days/view/StatisticUserKeepDaysHeader.vue";
import StatisticUserKeepDaysBody from "@/views/statistic_user_keep_days/view/StatisticUserKeepDaysBody.vue";

@Component({
    components: {
        StatisticUserKeepDaysHeader,
        StatisticUserKeepDaysBody,
    }
})
export default class ChannelStatisticUserKeepDays extends AbstractView {

    constructor() {
        super(ChannelStatisticUserKeepDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: ChannelStatisticUserKeepDaysProxy = this.getProxy(ChannelStatisticUserKeepDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
