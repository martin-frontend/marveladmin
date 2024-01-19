<template>
    <div class="content">
        <PlatActivityRankDialog v-if="myProxy.dialogData.bShow"/>
        <PlatActivityRankHeader/>
        <PlatActivityRankBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityRankMediator from "@/views/plat_activity_rank/mediator/PlatActivityRankMediator";
import PlatActivityRankProxy from "../proxy/PlatActivityRankProxy";
import { Component } from "vue-property-decorator";
import PlatActivityRankDialog from "./PlatActivityRankDialog.vue";
import PlatActivityRankHeader from "./PlatActivityRankHeader.vue";
import PlatActivityRankBody from "./PlatActivityRankBody.vue";

@Component({
    components: {
        PlatActivityRankDialog,
        PlatActivityRankHeader,
        PlatActivityRankBody,
    }
})
export default class PlatActivityRank extends AbstractView {

    constructor() {
        super(PlatActivityRankMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatActivityRankProxy = this.getProxy(PlatActivityRankProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
