<template>
    <div class="content">
        <PlatBlockCoinsLogDialog v-if="myProxy.dialogData.bShow"/>
        <PlatBlockCoinsLogHeader/>
        <PlatBlockCoinsLogBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBlockCoinsLogMediator from "@/views/plat_block_coins_log/mediator/PlatBlockCoinsLogMediator";
import PlatBlockCoinsLogProxy from "@/views/plat_block_coins_log/proxy/PlatBlockCoinsLogProxy";
import { Component } from "vue-property-decorator";
import PlatBlockCoinsLogDialog from "./PlatBlockCoinsLogDialog.vue";
import PlatBlockCoinsLogHeader from "./PlatBlockCoinsLogHeader.vue";
import PlatBlockCoinsLogBody from "./PlatBlockCoinsLogBody.vue";

@Component({
    components: {
        PlatBlockCoinsLogDialog,
        PlatBlockCoinsLogHeader,
        PlatBlockCoinsLogBody,
    }
})
export default class PlatBlockCoinsLog extends AbstractView {

    constructor() {
        super(PlatBlockCoinsLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatBlockCoinsLogProxy = this.getProxy(PlatBlockCoinsLogProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
