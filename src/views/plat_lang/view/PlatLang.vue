<template>
    <div class="content">
        <PlatLangDialog v-if="myProxy.dialogData.bShow" />
        <PlatLangHeader />
        <PlatLangBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatLangMediator from "@/views/plat_lang/mediator/PlatLangMediator";
import { Component } from "vue-property-decorator";
import PlatLangDialog from "./PlatLangDialog.vue";
import PlatLangHeader from "./PlatLangHeader.vue";
import PlatLangBody from "./PlatLangBody.vue";
import PlatLangProxy from "../proxy/PlatLangProxy";

@Component({
    components: {
        PlatLangDialog,
        PlatLangHeader,
        PlatLangBody,
    },
})
export default class PlatLang extends AbstractView {
    constructor() {
        super(PlatLangMediator);
    }

    destroyed() {
        super.destroyed();
    }
    private myProxy: PlatLangProxy = this.getProxy(PlatLangProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
