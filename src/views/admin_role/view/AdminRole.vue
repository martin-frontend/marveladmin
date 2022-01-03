<template>
    <div class="content">
        <AdminRoleDialog/>
        <AdminRoleHeader/>
        <AdminRoleBody/>
        <AdminRoleSettingDialog/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminRoleMediator from "@/views/admin_role/mediator/AdminRoleMediator";
import { Component } from "vue-property-decorator";
import AdminRoleDialog from "./AdminRoleDialog.vue";
import AdminRoleHeader from "./AdminRoleHeader.vue";
import AdminRoleBody from "./AdminRoleBody.vue";
import AdminRoleSettingDialog from "./AdminRoleSettingDialog.vue";

@Component({
    components: {
        AdminRoleDialog,
        AdminRoleHeader,
        AdminRoleBody,
        AdminRoleSettingDialog
    }
})
export default class AdminRole extends AbstractView {

    constructor() {
        super(AdminRoleMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
