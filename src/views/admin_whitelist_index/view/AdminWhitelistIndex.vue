<template>
    <div class="content">
        <AdminWhitelistIndexDialog v-if="myProxy.dialogData.bShow" />
        <AdminWhitelistIndexHeader />
        <AdminWhitelistIndexBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import AdminWhitelistIndexMediator from "@/views/admin_whitelist_index/mediator/AdminWhitelistIndexMediator";
import AdminWhitelistIndexProxy from "@/views/admin_whitelist_index/proxy/AdminWhitelistIndexProxy";
import { Component } from "vue-property-decorator";
import AdminWhitelistIndexDialog from "./AdminWhitelistIndexDialog.vue";
import AdminWhitelistIndexHeader from "./AdminWhitelistIndexHeader.vue";
import AdminWhitelistIndexBody from "./AdminWhitelistIndexBody.vue";

@Component({
    components: {
        AdminWhitelistIndexDialog,
        AdminWhitelistIndexHeader,
        AdminWhitelistIndexBody,
    },
})
export default class AdminWhitelistIndex extends AbstractView {
    constructor() {
        super(AdminWhitelistIndexMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: AdminWhitelistIndexProxy = this.getProxy(AdminWhitelistIndexProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
