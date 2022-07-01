<template>
    <div class="content">
        <PlatSwapLiquidityLogHeader />
        <PlatSwapLiquidityLogBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatSwapLiquidityLogMediator from "@/views/plat_swap_liquidity_log/mediator/PlatSwapLiquidityLogMediator";
import PlatSwapLiquidityLogProxy from "@/views/plat_swap_liquidity_log/proxy/PlatSwapLiquidityLogProxy";
import { Component } from "vue-property-decorator";
import PlatSwapLiquidityLogHeader from "./PlatSwapLiquidityLogHeader.vue";
import PlatSwapLiquidityLogBody from "./PlatSwapLiquidityLogBody.vue";

@Component({
    components: {
        PlatSwapLiquidityLogHeader,
        PlatSwapLiquidityLogBody,
    },
})
export default class PlatSwapLiquidityLog extends AbstractView {
    constructor() {
        super(PlatSwapLiquidityLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatSwapLiquidityLogProxy = this.getProxy(PlatSwapLiquidityLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
