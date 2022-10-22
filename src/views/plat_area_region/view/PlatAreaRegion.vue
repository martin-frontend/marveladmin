<template>
    <div class="content">
        <PlatAreaRegionDialog v-if="myProxy.dialogData.bShow" />
        <PlatAreaRegionHeader />
        <PlatAreaRegionBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatAreaRegionMediator from "@/views/plat_area_region/mediator/PlatAreaRegionMediator";
import PlatAreaRegionProxy from "@/views/plat_area_region/proxy/PlatAreaRegionProxy";
import { Component } from "vue-property-decorator";
import PlatAreaRegionDialog from "./PlatAreaRegionDialog.vue";
import PlatAreaRegionHeader from "./PlatAreaRegionHeader.vue";
import PlatAreaRegionBody from "./PlatAreaRegionBody.vue";

@Component({
    components: {
        PlatAreaRegionDialog,
        PlatAreaRegionHeader,
        PlatAreaRegionBody,
    },
})
export default class PlatAreaRegion extends AbstractView {
    constructor() {
        super(PlatAreaRegionMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatAreaRegionProxy = this.getProxy(PlatAreaRegionProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
