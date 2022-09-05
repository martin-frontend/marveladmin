<template>
    <div>
        <PlatsWalletLogHeader />
        <PlatsWalletLogBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatsWalletLogMediator from "@/views/plats_wallet_log/mediator/PlatsWalletLogMediator";
import { Component } from "vue-property-decorator";
import PlatsWalletLogHeader from "./PlatsWalletLogHeader.vue";
import PlatsWalletLogBody from "./PlatsWalletLogBody.vue";

@Component({
    components: {
        PlatsWalletLogHeader,
        PlatsWalletLogBody,
    },
})
export default class PlatsWalletLog extends AbstractView {
    constructor() {
        super(PlatsWalletLogMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss"></style>
