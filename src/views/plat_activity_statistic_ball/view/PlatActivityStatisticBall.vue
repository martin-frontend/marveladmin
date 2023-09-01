<template>
    <div class="content">
        <PlatActivityStatisticBallDialog v-if="myProxy.dialogData.bShow"/>
        <PlatActivityStatisticBallHeader/>
        <PlatActivityStatisticBallBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityStatisticBallMediator from "@/views/plat_activity_statistic_ball/mediator/PlatActivityStatisticBallMediator";
import PlatActivityStatisticBallProxy from "../proxy/PlatActivityStatisticBallProxy";
import { Component } from "vue-property-decorator";
import PlatActivityStatisticBallDialog from "./PlatActivityStatisticBallDialog.vue";
import PlatActivityStatisticBallHeader from "./PlatActivityStatisticBallHeader.vue";
import PlatActivityStatisticBallBody from "./PlatActivityStatisticBallBody.vue";

@Component({
    components: {
        PlatActivityStatisticBallDialog,
        PlatActivityStatisticBallHeader,
        PlatActivityStatisticBallBody,
    }
})
export default class PlatActivityStatisticBall extends AbstractView {

    constructor() {
        super(PlatActivityStatisticBallMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatActivityStatisticBallProxy = this.getProxy(PlatActivityStatisticBallProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
