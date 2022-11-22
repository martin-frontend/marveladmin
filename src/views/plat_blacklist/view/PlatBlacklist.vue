<template>
    <div class="content">
        <PlatBlacklistDialog />
        <PlatBlacklistHeader />
        <PlatBlacklistBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBlacklistMediator from "@/views/plat_blacklist/mediator/PlatBlacklistMediator";
import { Component } from "vue-property-decorator";
import PlatBlacklistDialog from "./PlatBlacklistDialog.vue";
import PlatBlacklistHeader from "./PlatBlacklistHeader.vue";
import PlatBlacklistBody from "./PlatBlacklistBody.vue";

@Component({
    components: {
        PlatBlacklistDialog,
        PlatBlacklistHeader,
        PlatBlacklistBody,
    },
})
export default class PlatBlacklist extends AbstractView {
    constructor() {
        super(PlatBlacklistMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
