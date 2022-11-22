<template>
    <div class="content">
        <PlatBlockCoinsDialog v-if="myProxy.dialogData.bShow" />
        <PlatBlockCoinsHeader />
        <PlatBlockCoinsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBlockCoinsMediator from "@/views/plat_block_coins/mediator/PlatBlockCoinsMediator";
import PlatBlockCoinsProxy from "../proxy/PlatBlockCoinsProxy";
import { Component } from "vue-property-decorator";
import PlatBlockCoinsDialog from "./PlatBlockCoinsDialog.vue";
import PlatBlockCoinsHeader from "./PlatBlockCoinsHeader.vue";
import PlatBlockCoinsBody from "./PlatBlockCoinsBody.vue";

@Component({
    components: {
        PlatBlockCoinsDialog,
        PlatBlockCoinsHeader,
        PlatBlockCoinsBody,
    },
})
export default class PlatBlockCoins extends AbstractView {
    constructor() {
        super(PlatBlockCoinsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatBlockCoinsProxy = this.getProxy(PlatBlockCoinsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
