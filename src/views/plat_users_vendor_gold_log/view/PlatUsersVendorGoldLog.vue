<template>
    <div class="content plat_users_vendor_gold_log">
        <PlatUsersVendorGoldLogHeader />
        <PlatUsersVendorGoldLogBody />
        <PlatUsersVendorGoldLogSatausDialog v-if="myProxy.statusDialog.bShow" />
        <PlatUsersVendorGoldLogStatisticDialog v-if="myProxy.statisticDialog.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersVendorGoldLogMediator from "@/views/plat_users_vendor_gold_log/mediator/PlatUsersVendorGoldLogMediator";
import PlatUsersVendorGoldLogProxy from "@/views/plat_users_vendor_gold_log/proxy/PlatUsersVendorGoldLogProxy";
import { Component } from "vue-property-decorator";
import PlatUsersVendorGoldLogHeader from "./PlatUsersVendorGoldLogHeader.vue";
import PlatUsersVendorGoldLogBody from "./PlatUsersVendorGoldLogBody.vue";
import PlatUsersVendorGoldLogSatausDialog from "./PlatUsersVendorGoldLogSatausDialog.vue";
import PlatUsersVendorGoldLogStatisticDialog from "./PlatUsersVendorGoldLogStatisticDialog.vue";

@Component({
    components: {
        PlatUsersVendorGoldLogHeader,
        PlatUsersVendorGoldLogBody,
        PlatUsersVendorGoldLogSatausDialog,
        PlatUsersVendorGoldLogStatisticDialog,
    },
})
export default class PlatUsersVendorGoldLog extends AbstractView {
    constructor() {
        super(PlatUsersVendorGoldLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatUsersVendorGoldLogProxy = this.getProxy(PlatUsersVendorGoldLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
