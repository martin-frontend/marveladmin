<template>
    <div class="content">
        <PlatBonusAllStockModelDialog />
        <PlatBonusAllStockModelHeader />
        <PlatBonusAllStockModelBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBonusAllStockModelMediator from "@/views/plat_bonus_all_stock_model/mediator/PlatBonusAllStockModelMediator";
import PlatBonusAllStockModelProxy from "@/views/plat_bonus_all_stock_model/proxy/PlatBonusAllStockModelProxy";
import { Component } from "vue-property-decorator";
import PlatBonusAllStockModelDialog from "./PlatBonusAllStockModelDialog.vue";
import PlatBonusAllStockModelHeader from "./PlatBonusAllStockModelHeader.vue";
import PlatBonusAllStockModelBody from "./PlatBonusAllStockModelBody.vue";

@Component({
    components: {
        PlatBonusAllStockModelDialog,
        PlatBonusAllStockModelHeader,
        PlatBonusAllStockModelBody,
    },
})
export default class PlatBonusAllStockModel extends AbstractView {
    constructor() {
        super(PlatBonusAllStockModelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
