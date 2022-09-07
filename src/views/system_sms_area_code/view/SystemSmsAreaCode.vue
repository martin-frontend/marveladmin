<template>
    <div class="content">
        <SystemSmsAreaCodeDialog v-if="myProxy.dialogData.bShow" />
        <SystemSmsAreaCodeHeader />
        <SystemSmsAreaCodeBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SystemSmsAreaCodeMediator from "@/views/system_sms_area_code/mediator/SystemSmsAreaCodeMediator";
import SystemSmsAreaCodeProxy from "@/views/system_sms_area_code/proxy/SystemSmsAreaCodeProxy";
import { Component } from "vue-property-decorator";
import SystemSmsAreaCodeDialog from "./SystemSmsAreaCodeDialog.vue";
import SystemSmsAreaCodeHeader from "./SystemSmsAreaCodeHeader.vue";
import SystemSmsAreaCodeBody from "./SystemSmsAreaCodeBody.vue";

@Component({
    components: {
        SystemSmsAreaCodeDialog,
        SystemSmsAreaCodeHeader,
        SystemSmsAreaCodeBody,
    },
})
export default class SystemSmsAreaCode extends AbstractView {
    constructor() {
        super(SystemSmsAreaCodeMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: SystemSmsAreaCodeProxy = this.getProxy(SystemSmsAreaCodeProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
