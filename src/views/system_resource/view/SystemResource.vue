<template>
    <div class="content">
        <SystemResourceDialog v-if="myProxy.dialogData.bShow" />
        <ProgressDialog v-if="myProxy.imgBatchDialogData.bShow" />
        <SystemResourceHeader />
        <SystemResourceBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SystemResourceMediator from "@/views/system_resource/mediator/SystemResourceMediator";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemResourceProxy from "../proxy/SystemResourceProxy";
import SystemResourceDialog from "./SystemResourceDialog.vue";
import SystemResourceHeader from "./SystemResourceHeader.vue";
import SystemResourceBody from "./SystemResourceBody.vue";
import ProgressDialog from "./components/ProgressDialog.vue";

@Component({
    components: {
        SystemResourceDialog,
        SystemResourceHeader,
        SystemResourceBody,
        ProgressDialog,
    },
})
export default class SystemResource extends AbstractView {
    constructor() {
        super(SystemResourceMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
