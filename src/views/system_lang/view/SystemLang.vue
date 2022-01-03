<template>
    <div class="content">
        <SystemLangDialog v-if="myProxy.dialogData.bShow"/>
        <SystemLangHeader/>
        <SystemLangBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SystemLangMediator from "@/views/system_lang/mediator/SystemLangMediator";
import SystemLangProxy from "@/views/system_lang/proxy/SystemLangProxy";
import { Component } from "vue-property-decorator";
import SystemLangDialog from "./SystemLangDialog.vue";
import SystemLangHeader from "./SystemLangHeader.vue";
import SystemLangBody from "./SystemLangBody.vue";

@Component({
    components: {
        SystemLangDialog,
        SystemLangHeader,
        SystemLangBody,
    }
})
export default class SystemLang extends AbstractView {

    constructor() {
        super(SystemLangMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
