<template>
    <div class="content">
        <StatisticUserDaysHeader />
        <StatisticUserDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import StatisticUserDaysMediator from "@/views/statistic_user_days/mediator/StatisticUserDaysMediator";
import StatisticUserDaysProxy from "@/views/statistic_user_days/proxy/StatisticUserDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticUserDaysDialog from "./StatisticUserDaysDialog.vue";
import StatisticUserDaysHeader from "./StatisticUserDaysHeader.vue";
import StatisticUserDaysBody from "./StatisticUserDaysBody.vue";

@Component({
    components: {
        StatisticUserDaysHeader,
        StatisticUserDaysBody,
    },
})
export default class StatisticUserDays extends AbstractView {
    constructor() {
        super(StatisticUserDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: StatisticUserDaysProxy = this.getProxy(StatisticUserDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
