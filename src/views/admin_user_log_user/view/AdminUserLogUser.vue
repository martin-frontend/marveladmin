<template>
    <div class="content">
        <AdminUserLogUserDialog v-if="myProxy.dialogData.bShow"/>
        <AdminUserLogUserHeader/>
        <AdminUserLogUserBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminUserLogUserMediator from "@/views/admin_user_log_user/mediator/AdminUserLogUserMediator";
import AdminUserLogUserProxy from "@/views/admin_user_log_user/proxy/AdminUserLogUserProxy";
import { Component } from "vue-property-decorator";
import AdminUserLogUserDialog from "./AdminUserLogUserDialog.vue";
import AdminUserLogUserHeader from "./AdminUserLogUserHeader.vue";
import AdminUserLogUserBody from "./AdminUserLogUserBody.vue";

@Component({
    components: {
        AdminUserLogUserDialog,
        AdminUserLogUserHeader,
        AdminUserLogUserBody,
    }
})
export default class AdminUserLogUser extends AbstractView {

    constructor() {
        super(AdminUserLogUserMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: AdminUserLogUserProxy = this.getProxy(AdminUserLogUserProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
