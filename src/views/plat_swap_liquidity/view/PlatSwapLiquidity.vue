<template>
    <div class="content">
        <SettingDialog v-if="myProxy.dialogSetting.bShow" />
        <LiquidityDialog v-if="myProxy.dialogLiquidity.bShow" />
        <PlatSwapLiquidityHeader />
        <PlatSwapLiquidityBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatSwapLiquidityMediator from "@/views/plat_swap_liquidity/mediator/PlatSwapLiquidityMediator";
import PlatSwapLiquidityProxy from "@/views/plat_swap_liquidity/proxy/PlatSwapLiquidityProxy";
import { Component } from "vue-property-decorator";
import SettingDialog from "./SettingDialog.vue";
import LiquidityDialog from "./LiquidityDialog.vue";
import PlatSwapLiquidityHeader from "./PlatSwapLiquidityHeader.vue";
import PlatSwapLiquidityBody from "./PlatSwapLiquidityBody.vue";

@Component({
    components: {
        SettingDialog,
        LiquidityDialog,
        PlatSwapLiquidityHeader,
        PlatSwapLiquidityBody,
    },
})
export default class PlatSwapLiquidity extends AbstractView {
    constructor() {
        super(PlatSwapLiquidityMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatSwapLiquidityProxy = this.getProxy(PlatSwapLiquidityProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
