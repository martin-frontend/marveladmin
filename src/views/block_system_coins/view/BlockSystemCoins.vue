<template>
    <div class="content">
        <BlockSystemCoinsDialog v-if="myProxy.dialogData.bShow"/>
        <BlockSystemCoinsHeader/>
        <BlockSystemCoinsBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import BlockSystemCoinsMediator from "@/views/block_system_coins/mediator/BlockSystemCoinsMediator";
import BlockSystemCoinsProxy from "../proxy/BlockSystemCoinsProxy";
import { Component } from "vue-property-decorator";
import BlockSystemCoinsDialog from "./BlockSystemCoinsDialog.vue";
import BlockSystemCoinsHeader from "./BlockSystemCoinsHeader.vue";
import BlockSystemCoinsBody from "./BlockSystemCoinsBody.vue";

@Component({
    components: {
        BlockSystemCoinsDialog,
        BlockSystemCoinsHeader,
        BlockSystemCoinsBody,
    }
})
export default class BlockSystemCoins extends AbstractView {

    constructor() {
        super(BlockSystemCoinsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: BlockSystemCoinsProxy = this.getProxy(BlockSystemCoinsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
