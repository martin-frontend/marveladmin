<template>
    <div class="content">
        <PlatUserStatisticRankDaysDialog v-if="myProxy.dialogData.bShow" />
        <PlatUserStatisticRankDaysHeader />
        <PlatUserStatisticRankDaysBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelPlatUserStatisticRankDaysMediator from "@/views/channel_plat_user_statistic_rank_days/mediator/ChannelPlatUserStatisticRankDaysMediator";
import ChannelPlatUserStatisticRankDaysProxy from "../proxy/ChannelPlatUserStatisticRankDaysProxy";
import { Component } from "vue-property-decorator";
import PlatUserStatisticRankDaysDialog from "@/views/plat_user_statistic_rank_days/view/PlatUserStatisticRankDaysDialog.vue";
import PlatUserStatisticRankDaysHeader from "@/views/plat_user_statistic_rank_days/view/PlatUserStatisticRankDaysHeader.vue";
import PlatUserStatisticRankDaysBody from "@/views/plat_user_statistic_rank_days/view/PlatUserStatisticRankDaysBody.vue";
import ProgressDialog from "@/views/plat_user_statistic_rank_days/view/components/ProgressDialog.vue";
import FieldSelectionDialog from "@/views/plat_user_statistic_rank_days/view/components/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatUserStatisticRankDaysDialog,
        PlatUserStatisticRankDaysHeader,
        PlatUserStatisticRankDaysBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class ChannelPlatUserStatisticRankDays extends AbstractView {
    constructor() {
        super(ChannelPlatUserStatisticRankDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: ChannelPlatUserStatisticRankDaysProxy = this.getProxy(ChannelPlatUserStatisticRankDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
