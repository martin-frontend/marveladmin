<template>
    <div class="content">
        <PlatUsersBackwaterLogDialog v-if="myProxy.dialogData.bShow" />
        <PlatUsersBackwaterLogHeader />
        <PlatUsersBackwaterLogBody />
        <ProgressDialog v-if="myProxy.exportData.isExportExcel" />
        <FieldSelectionDialog v-if="myProxy.fieldSelectionData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersBackwaterLogMediator from "@/views/plat_users_backwater_log/mediator/PlatUsersBackwaterLogMediator";
import PlatUsersBackwaterLogProxy from "@/views/plat_users_backwater_log/proxy/PlatUsersBackwaterLogProxy";
import { Component } from "vue-property-decorator";
import PlatUsersBackwaterLogDialog from "./PlatUsersBackwaterLogDialog.vue";
import PlatUsersBackwaterLogHeader from "./PlatUsersBackwaterLogHeader.vue";
import PlatUsersBackwaterLogBody from "./PlatUsersBackwaterLogBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";
import FieldSelectionDialog from "./components/FieldSelectionDialog.vue";

@Component({
    components: {
        PlatUsersBackwaterLogDialog,
        PlatUsersBackwaterLogHeader,
        PlatUsersBackwaterLogBody,
        ProgressDialog,
        FieldSelectionDialog,
    },
})
export default class PlatUsersBackwaterLog extends AbstractView {
    constructor() {
        super(PlatUsersBackwaterLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: PlatUsersBackwaterLogProxy = this.getProxy(PlatUsersBackwaterLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
