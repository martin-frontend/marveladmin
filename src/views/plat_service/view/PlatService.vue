<template>
    <div class="content">
        <PlatServiceDialog v-if="myProxy.dialogData.bShow" />
        <PlatServiceHeader />
        <PlatServiceBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatServiceMediator from "@/views/plat_service/mediator/PlatServiceMediator";
import PlatServiceProxy from "@/views/plat_service/proxy/PlatServiceProxy";
import { Component } from "vue-property-decorator";
import PlatServiceDialog from "./PlatServiceDialog.vue";
import PlatServiceHeader from "./PlatServiceHeader.vue";
import PlatServiceBody from "./PlatServiceBody.vue";

@Component({
    components: {
        PlatServiceDialog,
        PlatServiceHeader,
        PlatServiceBody,
    },
})
export default class PlatService extends AbstractView {
    constructor() {
        super(PlatServiceMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatServiceProxy = this.getProxy(PlatServiceProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
