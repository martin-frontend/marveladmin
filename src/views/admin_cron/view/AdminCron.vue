<template>
    <div class="content">
        <AdminCronDialog />
        <AdminCronQueueBatchDialog />
        <AdminCronQueuePreviewDialog />
        <AdminCronHeader />
        <AdminCronBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminCronMediator from "@/views/admin_cron/mediator/AdminCronMediator";
import { Component } from "vue-property-decorator";
import AdminCronDialog from "./AdminCronDialog.vue";
import AdminCronQueueBatchDialog from "./AdminCronQueueBatchDialog.vue";
import AdminCronQueuePreviewDialog from "./AdminCronQueuePreviewDialog.vue";
import AdminCronHeader from "./AdminCronHeader.vue";
import AdminCronBody from "./AdminCronBody.vue";

@Component({
    components: {
        AdminCronDialog,
        AdminCronQueueBatchDialog,
        AdminCronQueuePreviewDialog,
        AdminCronHeader,
        AdminCronBody,
    },
})
export default class AdminCron extends AbstractView {
    constructor() {
        super(AdminCronMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
