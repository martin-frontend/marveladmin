<template>
    <div class="content">
        <UserTagDialog v-if="myProxy.dialogData.bShow"/>
        <UserTagHeader/>
        <UserTagBody/>
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
        <UsersDialog v-if="myProxy.usersDialogData.bShow"/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import UserTagMediator from "@/views/user_tag/mediator/UserTagMediator";
import UserTagProxy from "../proxy/UserTagProxy";
import { Component } from "vue-property-decorator";
import UserTagDialog from "./UserTagDialog.vue";
import UserTagHeader from "./UserTagHeader.vue";
import UserTagBody from "./UserTagBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";
import UsersDialog from "./UsersDialog.vue";

@Component({
    components: {
        UserTagDialog,
        UserTagHeader,
        UserTagBody,
        ProgressDialog,
        FieldSelectionDialog,
        UsersDialog,
    }
})
export default class UserTag extends AbstractView {

    constructor() {
        super(UserTagMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: UserTagProxy = this.getProxy(UserTagProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
