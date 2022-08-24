<template>
    <div>

    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatsWalletMediator from "@/views/plats_wallet/mediator/PlatsWalletMediator";
import { Component } from "vue-property-decorator";

@Component
export default class PlatsWallet extends AbstractView {

    constructor() {
        super(PlatsWalletMediator);
    }

    destroyed(){
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">

</style>
