<template>
    <div class="content">
        <AdminUserDialog />
        <AdminUserHeader />
        <AdminUserBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminUserMediator from "@/views/admin_user/mediator/AdminUserMediator";
import { Component } from "vue-property-decorator";
import AdminUserDialog from "./AdminUserDialog.vue";
import AdminUserHeader from "./AdminUserHeader.vue";
import AdminUserBody from "./AdminUserBody.vue";

@Component({
    components: {
        AdminUserDialog,
        AdminUserHeader,
        AdminUserBody,
    },
})
export default class AdminUser extends AbstractView {
    constructor() {
        super(AdminUserMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
