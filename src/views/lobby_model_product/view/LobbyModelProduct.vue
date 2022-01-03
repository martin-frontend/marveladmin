<template>
    <div class="content">
        <LobbyModelProductDialog/>
        <LobbyModelProductHeader/>
        <LobbyModelProductBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import LobbyModelProductMediator from "@/views/lobby_model_product/mediator/LobbyModelProductMediator";
import { Component } from "vue-property-decorator";
import LobbyModelProductDialog from "./LobbyModelProductDialog.vue";
import LobbyModelProductHeader from "./LobbyModelProductHeader.vue";
import LobbyModelProductBody from "./LobbyModelProductBody.vue";

@Component({
    components: {
        LobbyModelProductDialog,
        LobbyModelProductHeader,
        LobbyModelProductBody,
    }
})
export default class LobbyModelProduct extends AbstractView {

    constructor() {
        super(LobbyModelProductMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
