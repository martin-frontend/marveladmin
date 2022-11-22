<template>
    <div class="content">
        <PlatEmailDialog v-if="myProxy.dialogData.bShow" />
        <PlatEmailHeader />
        <PlatEmailBody />
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

@Component({
    components: {
        PlatEmailDialog,
        PlatEmailHeader,
        PlatEmailBody,
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
    private myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
