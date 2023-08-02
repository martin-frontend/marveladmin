<template>
    <div class="content">
        <PlatUsersVerificationDialog v-if="myProxy.dialogData.bShow" />
        <PlatUsersVerificationHeader />
        <PlatUsersVerificationBody />
        <RemarkDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersVerificationMediator from "@/views/plat_users_verification/mediator/PlatUsersVerificationMediator";
import PlatUsersVerificationProxy from "@/views/plat_users_verification/proxy/PlatUsersVerificationProxy";
import { Component } from "vue-property-decorator";
import PlatUsersVerificationDialog from "./PlatUsersVerificationDialog.vue";
import PlatUsersVerificationHeader from "./PlatUsersVerificationHeader.vue";
import PlatUsersVerificationBody from "./PlatUsersVerificationBody.vue";
import RemarkDialog from "./components/RemarkDialog.vue";
@Component({
    components: {
        PlatUsersVerificationDialog,
        PlatUsersVerificationHeader,
        PlatUsersVerificationBody,
        RemarkDialog,
    },
})
export default class PlatUsersVerification extends AbstractView {
    constructor() {
        super(PlatUsersVerificationMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUsersVerificationProxy = this.getProxy(PlatUsersVerificationProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
