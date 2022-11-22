<template>
    <div class="content">
        <GameDomainDialog />
        <GameDomainHeader />
        <GameDomainBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import GameDomainMediator from "@/views/game_domain/mediator/GameDomainMediator";
import { Component } from "vue-property-decorator";
import GameDomainDialog from "./GameDomainDialog.vue";
import GameDomainHeader from "./GameDomainHeader.vue";
import GameDomainBody from "./GameDomainBody.vue";

@Component({
    components: {
        GameDomainDialog,
        GameDomainHeader,
        GameDomainBody,
    },
})
export default class GameDomain extends AbstractView {
    constructor() {
        super(GameDomainMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
