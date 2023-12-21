<template>
    <div class="content">
        <GoldWaterHeader />
        <GoldWaterBody />
        <GoldWaterDialog v-if="myProxy.dialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import GoldWaterMediator from "@/views/gold_water/mediator/GoldWaterMediator";
import { Component } from "vue-property-decorator";
import GoldWaterHeader from "./GoldWaterHeader.vue";
import GoldWaterBody from "./GoldWaterBody.vue";
import GoldWaterDialog from "./GoldWaterDialog.vue";
import GoldWaterProxy from "../proxy/GoldWaterProxy";

@Component({
    components: {
        GoldWaterHeader,
        GoldWaterBody,
        GoldWaterDialog,
    },
})
export default class GoldWater extends AbstractView {
    constructor() {
        super(GoldWaterMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    myProxy: GoldWaterProxy = this.getProxy(GoldWaterProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
