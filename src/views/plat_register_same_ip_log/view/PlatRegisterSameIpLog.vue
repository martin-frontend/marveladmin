<template>
    <div class="content">
        <PlatRegisterSameIpLogDialog v-if="myProxy.dialogData.bShow"/>
        <PlatRegisterSameIpLogHeader/>
        <PlatRegisterSameIpLogBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatRegisterSameIpLogMediator from "@/views/plat_register_same_ip_log/mediator/PlatRegisterSameIpLogMediator";
import PlatRegisterSameIpLogProxy from "@/views/plat_register_same_ip_log/proxy/PlatRegisterSameIpLogProxy";
import { Component } from "vue-property-decorator";
import PlatRegisterSameIpLogDialog from "./PlatRegisterSameIpLogDialog.vue";
import PlatRegisterSameIpLogHeader from "./PlatRegisterSameIpLogHeader.vue";
import PlatRegisterSameIpLogBody from "./PlatRegisterSameIpLogBody.vue";

@Component({
    components: {
        PlatRegisterSameIpLogDialog,
        PlatRegisterSameIpLogHeader,
        PlatRegisterSameIpLogBody,
    }
})
export default class PlatRegisterSameIpLog extends AbstractView {

    constructor() {
        super(PlatRegisterSameIpLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatRegisterSameIpLogProxy = this.getProxy(PlatRegisterSameIpLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
