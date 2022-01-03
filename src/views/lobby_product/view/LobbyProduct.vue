<template>
    <div class="content lobby_product">
        <LobbyProductDialog v-if="myProxy.dialogData.bShow"/>
        <LobbyProductHeader/>
        <LobbyProductBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import LobbyProductMediator from "@/views/lobby_product/mediator/LobbyProductMediator";
import LobbyProductProxy from "@/views/lobby_product/proxy/LobbyProductProxy";
import { Component } from "vue-property-decorator";
import LobbyProductDialog from "./LobbyProductDialog.vue";
import LobbyProductHeader from "./LobbyProductHeader.vue";
import LobbyProductBody from "./LobbyProductBody.vue";

@Component({
    components: {
        LobbyProductDialog,
        LobbyProductHeader,
        LobbyProductBody,
    }
})
export default class LobbyProduct extends AbstractView {

    constructor() {
        super(LobbyProductMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: LobbyProductProxy = this.getProxy(LobbyProductProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
