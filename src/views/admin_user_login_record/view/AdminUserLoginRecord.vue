<template>
    <div class="content">
        <AdminUserLoginRecordHeader />
        <AdminUserLoginRecordBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminUserLoginRecordMediator from "@/views/admin_user_login_record/mediator/AdminUserLoginRecordMediator";
import AdminUserLoginRecordProxy from "@/views/admin_user_login_record/proxy/AdminUserLoginRecordProxy";
import { Component } from "vue-property-decorator";
import AdminUserLoginRecordHeader from "./AdminUserLoginRecordHeader.vue";
import AdminUserLoginRecordBody from "./AdminUserLoginRecordBody.vue";

@Component({
    components: {
        AdminUserLoginRecordHeader,
        AdminUserLoginRecordBody,
    },
})
export default class AdminUserLoginRecord extends AbstractView {
    constructor() {
        super(AdminUserLoginRecordMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: AdminUserLoginRecordProxy = this.getProxy(AdminUserLoginRecordProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
