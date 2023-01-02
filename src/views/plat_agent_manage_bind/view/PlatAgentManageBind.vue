<template>
    <div class="content">
        <PlatAgentManageBindDialog v-if="myProxy.dialogData.bShow" />
        <PlatAgentManageBindHeader />
        <PlatAgentManageBindBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAgentManageBindMediator from "@/views/plat_agent_manage_bind/mediator/PlatAgentManageBindMediator";
import PlatAgentManageBindProxy from "@/views/plat_agent_manage_bind/proxy/PlatAgentManageBindProxy";
import { Component } from "vue-property-decorator";
import PlatAgentManageBindDialog from "./PlatAgentManageBindDialog.vue";
import PlatAgentManageBindHeader from "./PlatAgentManageBindHeader.vue";
import PlatAgentManageBindBody from "./PlatAgentManageBindBody.vue";

@Component({
    components: {
        PlatAgentManageBindDialog,
        PlatAgentManageBindHeader,
        PlatAgentManageBindBody,
    },
})
export default class PlatAgentManageBind extends AbstractView {
    constructor() {
        super(PlatAgentManageBindMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatAgentManageBindProxy = this.getProxy(PlatAgentManageBindProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
