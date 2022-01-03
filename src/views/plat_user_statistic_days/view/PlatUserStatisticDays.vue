<template>
    <div class="content">
        <PlatUserStatisticDaysHeader />
        <PlatUserStatisticDaysBody />
        <!-- <PlatUserStatisticDaysDialog v-if="myProxy.dialogData.bShow" /> -->
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserStatisticDaysMediator from "@/views/plat_user_statistic_days/mediator/PlatUserStatisticDaysMediator";
import PlatUserStatisticDaysProxy from "@/views/plat_user_statistic_days/proxy/PlatUserStatisticDaysProxy";
import { Component } from "vue-property-decorator";
import PlatUserStatisticDaysHeader from "./PlatUserStatisticDaysHeader.vue";
import PlatUserStatisticDaysBody from "./PlatUserStatisticDaysBody.vue";
import PlatUserStatisticDaysDialog from "./PlatUserStatisticDaysDialog.vue";

@Component({
    components: {
        PlatUserStatisticDaysHeader,
        PlatUserStatisticDaysBody,
        // PlatUserStatisticDaysDialog,
    },
})
export default class PlatUserStatisticDays extends AbstractView {
    constructor() {
        super(PlatUserStatisticDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUserStatisticDaysProxy = this.getProxy(PlatUserStatisticDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
