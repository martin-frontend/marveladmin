<template>
    <div class="content">
        <PlatSwapOrdersHeader />
        <PlatSwapOrdersBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatSwapOrdersMediator from "@/views/plat_swap_orders/mediator/PlatSwapOrdersMediator";
import PlatSwapOrdersProxy from "@/views/plat_swap_orders/proxy/PlatSwapOrdersProxy";
import { Component } from "vue-property-decorator";
import PlatSwapOrdersHeader from "./PlatSwapOrdersHeader.vue";
import PlatSwapOrdersBody from "./PlatSwapOrdersBody.vue";

@Component({
    components: {
        PlatSwapOrdersHeader,
        PlatSwapOrdersBody,
    },
})
export default class PlatSwapOrders extends AbstractView {
    constructor() {
        super(PlatSwapOrdersMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatSwapOrdersProxy = this.getProxy(PlatSwapOrdersProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
