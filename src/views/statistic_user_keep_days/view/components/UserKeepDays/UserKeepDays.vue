<template>
    <div class="content">
        <StatisticUserKeepDaysHeader />
        <StatisticUserKeepDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../../../core/abstract/AbstractView";
import StatisticUserKeepDaysMediator from "@/views/statistic_user_keep_days/mediator/StatisticUserKeepDaysMediator";
import StatisticUserKeepDaysProxy from "@/views/statistic_user_keep_days/proxy/StatisticUserKeepDaysProxy";
import { Component } from "vue-property-decorator";
import StatisticUserKeepDaysHeader from "./UserKeepDaysHeader.vue";
import StatisticUserKeepDaysBody from "./UserKeepDaysBody.vue";

@Component({
    components: {
        StatisticUserKeepDaysHeader,
        StatisticUserKeepDaysBody,
    },
})
export default class UserKeepDays extends AbstractView {

}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
