<template>
    <div class="content">
        <PlatUsersEventRecordHeader />
        <PlatUsersEventRecordBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersEventRecordMediator from "@/views/plat_users_event_record/mediator/PlatUsersEventRecordMediator";
import PlatUsersEventRecordProxy from "@/views/plat_users_event_record/proxy/PlatUsersEventRecordProxy";
import { Component } from "vue-property-decorator";
import PlatUsersEventRecordDialog from "./PlatUsersEventRecordDialog.vue";
import PlatUsersEventRecordHeader from "./PlatUsersEventRecordHeader.vue";
import PlatUsersEventRecordBody from "./PlatUsersEventRecordBody.vue";

@Component({
    components: {
        PlatUsersEventRecordDialog,
        PlatUsersEventRecordHeader,
        PlatUsersEventRecordBody,
    },
})
export default class PlatUsersEventRecord extends AbstractView {
    constructor() {
        super(PlatUsersEventRecordMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUsersEventRecordProxy = this.getProxy(PlatUsersEventRecordProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
