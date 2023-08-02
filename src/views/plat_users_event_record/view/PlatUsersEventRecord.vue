<template>
    <div class="content">
        <PlatUsersEventRecordHeader />
        <PlatUsersEventRecordBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
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
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatUsersEventRecordDialog,
        PlatUsersEventRecordHeader,
        PlatUsersEventRecordBody,
        ProgressDialog,
        FieldSelectionDialog,
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
    myProxy: PlatUsersEventRecordProxy = this.getProxy(PlatUsersEventRecordProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
