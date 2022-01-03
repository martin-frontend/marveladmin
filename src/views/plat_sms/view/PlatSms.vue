<template>
    <div class="content plat_sms">
        <PlatSmsDialog v-if="myProxy.dialogData.bShow" />
        <PlatSmsHeader />
        <PlatSmsBody />
        <MessageDialog v-if="myProxy.messageDialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatSmsMediator from "@/views/plat_sms/mediator/PlatSmsMediator";
import PlatSmsProxy from "@/views/plat_sms/proxy/PlatSmsProxy";
import { Component } from "vue-property-decorator";
import PlatSmsDialog from "./PlatSmsDialog.vue";
import PlatSmsHeader from "./PlatSmsHeader.vue";
import PlatSmsBody from "./PlatSmsBody.vue";
import MessageDialog from "./components/MessageDialog.vue";

@Component({
    components: {
        PlatSmsDialog,
        PlatSmsHeader,
        PlatSmsBody,
        MessageDialog,
    },
})
export default class PlatSms extends AbstractView {
    constructor() {
        super(PlatSmsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatSmsProxy = this.getProxy(PlatSmsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
