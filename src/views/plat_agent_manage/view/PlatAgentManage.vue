<template>
    <div class="content">
        <PlatAgentManageDialog v-if="myProxy.dialogData.bShow"/>
        <PlatAgentManageHeader/>
        <PlatAgentManageBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAgentManageMediator from "@/views/plat_agent_manage/mediator/PlatAgentManageMediator";
import PlatAgentManageProxy from "@/views/plat_agent_manage/proxy/PlatAgentManageProxy";
import { Component } from "vue-property-decorator";
import PlatAgentManageDialog from "./PlatAgentManageDialog.vue";
import PlatAgentManageHeader from "./PlatAgentManageHeader.vue";
import PlatAgentManageBody from "./PlatAgentManageBody.vue";

@Component({
    components: {
        PlatAgentManageDialog,
        PlatAgentManageHeader,
        PlatAgentManageBody,
    }
})
export default class PlatAgentManage extends AbstractView {

    constructor() {
        super(PlatAgentManageMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatAgentManageProxy = this.getProxy(PlatAgentManageProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
