<template>
    <div class="content">
        <PlatUsersCoinStatisticDaysHeader />
        <PlatUsersCoinStatisticDaysBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersCoinStatisticDaysMediator from "@/views/plat_users_coin_statistic_days/mediator/PlatUsersCoinStatisticDaysMediator";
import PlatUsersCoinStatisticDaysProxy from "@/views/plat_users_coin_statistic_days/proxy/PlatUsersCoinStatisticDaysProxy";
import { Component } from "vue-property-decorator";
import PlatUsersCoinStatisticDaysHeader from "./PlatUsersCoinStatisticDaysHeader.vue";
import PlatUsersCoinStatisticDaysBody from "./PlatUsersCoinStatisticDaysBody.vue";

@Component({
    components: {
        PlatUsersCoinStatisticDaysHeader,
        PlatUsersCoinStatisticDaysBody,
    },
})
export default class PlatUsersCoinStatisticDays extends AbstractView {
    constructor() {
        super(PlatUsersCoinStatisticDaysMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatUsersCoinStatisticDaysProxy = this.getProxy(PlatUsersCoinStatisticDaysProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
