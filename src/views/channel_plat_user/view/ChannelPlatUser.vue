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
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import ChannelPlatUserMediator from "@/views/channel_plat_user/mediator/ChannelPlatUserMediator";
import { Component } from "vue-property-decorator";
import PlatUserDialog from "@/views/plat_user/view/PlatUserDialog.vue";
import PlatUsersWalletDialog from "@/views/plat_user/view/PlatUsersWalletDialog.vue";
import ChangeChannelDialog from "@/views/plat_user/view/ChangeChannelDialog.vue";
import PlatUserHeader from "@/views/plat_user/view/PlatUserHeader.vue";
import PlatUserBody from "@/views/plat_user/view/PlatUserBody.vue";
import ChannelPlatUserProxy from "@/views/channel_plat_user/proxy/ChannelPlatUserProxy";
import PlatCreditUserDialog from "@/views/plat_user/view/PlatCreditUserDialog.vue";
import ProgressDialog from "@/views/plat_user/view/components/ProgressDialog.vue";
import FieldSelectionDialog from "@/views/plat_user/view/components/FieldSelectionDialog.vue";

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
    },
})
export default class PlatUser extends AbstractView {
    // proxy
    private myProxy: ChannelPlatUserProxy = this.getProxy(ChannelPlatUserProxy);

    constructor() {
        super(ChannelPlatUserMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
