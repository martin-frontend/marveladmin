<template>
    <div class="content plat_user">
        <PlatUserDialog v-if="myProxy.dialogData.bShow" />
        <PlatCreditUserDialog v-if="myProxy.creditUserDialogData.bShow" />
        <PlatUsersWalletDialog v-if="myProxy.walletDialogData.bShow" />
        <ChangeChannelDialog v-if="myProxy.changeChannelDialogData.bShow" />
        <PlatUserHeader />
        <PlatUserBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
        <MultipleUserDialog v-if="myProxy.mutipleUserDialogData.bShow" />
        <AddMultipleUserDialog v-if="myProxy.addMutipleUserData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserMediator from "@/views/plat_user/mediator/PlatUserMediator";
import { Component } from "vue-property-decorator";
import PlatUserDialog from "./PlatUserDialog.vue";
import PlatUsersWalletDialog from "./PlatUsersWalletDialog.vue";
import ChangeChannelDialog from "./ChangeChannelDialog.vue";
import PlatUserHeader from "./PlatUserHeader.vue";
import PlatUserBody from "./PlatUserBody.vue";
import PlatUserProxy from "../proxy/PlatUserProxy";
import PlatCreditUserDialog from "./PlatCreditUserDialog.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";
import MultipleUserDialog from "./MultipleUserDialog.vue";
import AddMultipleUserDialog from "./AddMultipleUserDialog.vue";

@Component({
    components: {
        PlatUserDialog,
        PlatUserHeader,
        PlatUserBody,
        PlatUsersWalletDialog,
        PlatCreditUserDialog,
        ChangeChannelDialog,
        ProgressDialog,
        FieldSelectionDialog,
        MultipleUserDialog,
        AddMultipleUserDialog,
    },
})
export default class PlatUser extends AbstractView {
    // proxy
    private myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);

    constructor() {
        super(PlatUserMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
