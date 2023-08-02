<template>
    <div class="content">
        <PlatMailTemplateDialog v-if="myProxy.dialogData.bShow"/>
        <PlatMailTemplateHeader/>
        <PlatMailTemplateBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatMailTemplateMediator from "@/views/plat_mail_template/mediator/PlatMailTemplateMediator";
import PlatMailTemplateProxy from "../proxy/PlatMailTemplateProxy";
import { Component } from "vue-property-decorator";
import PlatMailTemplateDialog from "./PlatMailTemplateDialog.vue";
import PlatMailTemplateHeader from "./PlatMailTemplateHeader.vue";
import PlatMailTemplateBody from "./PlatMailTemplateBody.vue";

@Component({
    components: {
        PlatMailTemplateDialog,
        PlatMailTemplateHeader,
        PlatMailTemplateBody,
    }
})
export default class PlatMailTemplate extends AbstractView {

    constructor() {
        super(PlatMailTemplateMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatMailTemplateProxy = this.getProxy(PlatMailTemplateProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
