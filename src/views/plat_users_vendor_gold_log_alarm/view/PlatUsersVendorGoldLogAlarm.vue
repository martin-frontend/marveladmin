<template>
    <div class="content">
        <PlatUsersVendorGoldLogAlarmDialog v-if="myProxy.dialogData.bShow"/>
        <PlatUsersVendorGoldLogAlarmHeader/>
        <PlatUsersVendorGoldLogAlarmBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersVendorGoldLogAlarmMediator from "@/views/plat_users_vendor_gold_log_alarm/mediator/PlatUsersVendorGoldLogAlarmMediator";
import PlatUsersVendorGoldLogAlarmProxy from "@/views/plat_users_vendor_gold_log_alarm/proxy/PlatUsersVendorGoldLogAlarmProxy";
import { Component } from "vue-property-decorator";
import PlatUsersVendorGoldLogAlarmDialog from "./PlatUsersVendorGoldLogAlarmDialog.vue";
import PlatUsersVendorGoldLogAlarmHeader from "./PlatUsersVendorGoldLogAlarmHeader.vue";
import PlatUsersVendorGoldLogAlarmBody from "./PlatUsersVendorGoldLogAlarmBody.vue";

@Component({
    components: {
        PlatUsersVendorGoldLogAlarmDialog,
        PlatUsersVendorGoldLogAlarmHeader,
        PlatUsersVendorGoldLogAlarmBody,
    }
})
export default class PlatUsersVendorGoldLogAlarm extends AbstractView {

    constructor() {
        super(PlatUsersVendorGoldLogAlarmMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUsersVendorGoldLogAlarmProxy = this.getProxy(PlatUsersVendorGoldLogAlarmProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
