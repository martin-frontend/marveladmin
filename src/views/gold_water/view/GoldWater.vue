<template>
    <div class="content">
        <GoldWaterHeader />
        <GoldWaterBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import GoldWaterMediator from "@/views/gold_water/mediator/GoldWaterMediator";
import { Component } from "vue-property-decorator";
import GoldWaterHeader from "./GoldWaterHeader.vue";
import GoldWaterBody from "./GoldWaterBody.vue";

@Component({
    components: {
        GoldWaterHeader,
        GoldWaterBody,
    },
})
export default class GoldWater extends AbstractView {
    constructor() {
        super(GoldWaterMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
