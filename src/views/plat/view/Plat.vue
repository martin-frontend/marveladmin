<template>
    <div class="content">
        <PlatDialog v-if="myProxy.dialogData.bShow" />
        <PlatHeader />
        <PlatBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatMediator from "@/views/plat/mediator/PlatMediator";
import { Component } from "vue-property-decorator";
import PlatDialog from "./PlatDialog.vue";
import PlatHeader from "./PlatHeader.vue";
import PlatBody from "./PlatBody.vue";
import PlatProxy from "../proxy/PlatProxy";

@Component({
    components: {
        PlatDialog,
        PlatHeader,
        PlatBody,
    },
})
export default class Plat extends AbstractView {
    constructor() {
        super(PlatMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatProxy = this.getProxy(PlatProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
