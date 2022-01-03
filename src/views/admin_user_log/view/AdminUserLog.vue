<template>
    <div class="content">
        <AdminUserLogDialog v-if="myProxy.dialogData.bShow" />
        <AdminUserLogHeader />
        <AdminUserLogBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminUserLogMediator from "@/views/admin_user_log/mediator/AdminUserLogMediator";
import AdminUserLogProxy from "@/views/admin_user_log/proxy/AdminUserLogProxy";
import { Component } from "vue-property-decorator";
import AdminUserLogDialog from "./AdminUserLogDialog.vue";
import AdminUserLogHeader from "./AdminUserLogHeader.vue";
import AdminUserLogBody from "./AdminUserLogBody.vue";

@Component({
    components: {
        AdminUserLogDialog,
        AdminUserLogHeader,
        AdminUserLogBody,
    },
})
export default class AdminUserLog extends AbstractView {
    constructor() {
        super(AdminUserLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: AdminUserLogProxy = this.getProxy(AdminUserLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
