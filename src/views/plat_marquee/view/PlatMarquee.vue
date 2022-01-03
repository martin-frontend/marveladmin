<template>
    <div class="content">
        <PlatMarqueeDialog v-if="myProxy.dialogData.bShow"/>
        <PlatMarqueeHeader/>
        <PlatMarqueeBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatMarqueeMediator from "@/views/plat_marquee/mediator/PlatMarqueeMediator";
import PlatMarqueeProxy from "@/views/plat_marquee/proxy/PlatMarqueeProxy";
import { Component } from "vue-property-decorator";
import PlatMarqueeDialog from "./PlatMarqueeDialog.vue";
import PlatMarqueeHeader from "./PlatMarqueeHeader.vue";
import PlatMarqueeBody from "./PlatMarqueeBody.vue";

@Component({
    components: {
        PlatMarqueeDialog,
        PlatMarqueeHeader,
        PlatMarqueeBody,
    }
})
export default class PlatMarquee extends AbstractView {

    constructor() {
        super(PlatMarqueeMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatMarqueeProxy = this.getProxy(PlatMarqueeProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
