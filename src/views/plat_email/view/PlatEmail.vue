<template>
    <div class="content">
        <PlatEmailDialog v-if="myProxy.dialogData.bShow" />
        <PlatEmailHeader />
        <PlatEmailBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <SendProgressDialog v-if="myProxy.sendData.userListExceed" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
        <ProgressEmailDialog v-if="myProxy.exportEmailData.isExportExcel" />
        <FieldSelectionEmailDialog v-if="myProxy.fieldSelectionEmailData.bShow" />
        <PlatEmailTemplateEdit v-if="myProxy.platEmailTemplateManager_dialogData.bShow" />
        <PlatEmailTemplateManager v-if="myProxy.platEmailTemplateManager_data.bShow" />
        <DialogPreview v-if="myProxy.dialogPreviewValue.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatEmailMediator from "@/views/plat_email/mediator/PlatEmailMediator";
import PlatEmailProxy from "@/views/plat_email/proxy/PlatEmailProxy";
import { Component } from "vue-property-decorator";
import PlatEmailDialog from "./PlatEmailDialog.vue";
import PlatEmailHeader from "./PlatEmailHeader.vue";
import PlatEmailBody from "./PlatEmailBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import SendProgressDialog from "./components/SendProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";
import FieldSelectionEmailDialog from "./components/FieldSelectionEmailDialog.vue";
import ProgressEmailDialog from "./components/ProgressEmailDialog.vue";
import PlatEmailTemplateEdit from "./PlatEmailTemplateEdit.vue";
import PlatEmailTemplateManager from "./PlatEmailTemplateManager.vue";
import DialogPreview from "./components/DialogPreview.vue";

@Component({
    components: {
        PlatEmailDialog,
        PlatEmailHeader,
        PlatEmailBody,
        ProgressDialog,
        SendProgressDialog,
        FieldSelectionDialog,
        FieldSelectionEmailDialog,
        ProgressEmailDialog,
        PlatEmailTemplateEdit,
        PlatEmailTemplateManager,
        DialogPreview,
    },
})
export default class PlatEmail extends AbstractView {
    constructor() {
        super(PlatEmailMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
