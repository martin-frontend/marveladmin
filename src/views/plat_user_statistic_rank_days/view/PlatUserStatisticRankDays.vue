<template>
    <div class="content">
        <PlatUserStatisticRankDaysDialog v-if="myProxy.dialogData.bShow" />
        <PlatUserStatisticRankDaysHeader />
        <PlatUserStatisticRankDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserStatisticRankDaysMediator from "@/views/plat_user_statistic_rank_days/mediator/PlatUserStatisticRankDaysMediator";
import PlatUserStatisticRankDaysProxy from "@/views/plat_user_statistic_rank_days/proxy/PlatUserStatisticRankDaysProxy";
import { Component } from "vue-property-decorator";
import PlatUserStatisticRankDaysDialog from "./PlatUserStatisticRankDaysDialog.vue";
import PlatUserStatisticRankDaysHeader from "./PlatUserStatisticRankDaysHeader.vue";
import PlatUserStatisticRankDaysBody from "./PlatUserStatisticRankDaysBody.vue";

@Component({
    components: {
        PlatUserStatisticRankDaysDialog,
        PlatUserStatisticRankDaysHeader,
        PlatUserStatisticRankDaysBody,
    },
})
export default class PlatUserStatisticRankDays extends AbstractView {
    constructor() {
        super(PlatUserStatisticRankDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUserStatisticRankDaysProxy = this.getProxy(PlatUserStatisticRankDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
