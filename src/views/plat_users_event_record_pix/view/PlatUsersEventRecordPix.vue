<template>
    <div class="content">
        <PlatUsersEventRecordPixHeader/>
        <PlatUsersEventRecordPixBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersEventRecordPixMediator from "@/views/plat_users_event_record_pix/mediator/PlatUsersEventRecordPixMediator";
import PlatUsersEventRecordPixProxy from "../proxy/PlatUsersEventRecordPixProxy";
import { Component } from "vue-property-decorator";
import PlatUsersEventRecordPixHeader from "./PlatUsersEventRecordPixHeader.vue";
import PlatUsersEventRecordPixBody from "./PlatUsersEventRecordPixBody.vue";

@Component({
    components: {
        PlatUsersEventRecordPixHeader,
        PlatUsersEventRecordPixBody,
    }
})
export default class PlatUsersEventRecordPix extends AbstractView {

    constructor() {
        super(PlatUsersEventRecordPixMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUsersEventRecordPixProxy = this.getProxy(PlatUsersEventRecordPixProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
