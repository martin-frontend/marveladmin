<template>
    <div class="content">
        <PlatChannelDialog />
        <PlatChannelHeader />
        <PlatChannelBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatChannelMediator from "@/views/plat_channel/mediator/PlatChannelMediator";
import { Component } from "vue-property-decorator";
import PlatChannelDialog from "./PlatChannelDialog.vue";
import PlatChannelHeader from "./PlatChannelHeader.vue";
import PlatChannelBody from "./PlatChannelBody.vue";

@Component({
    components: {
        PlatChannelDialog,
        PlatChannelHeader,
        PlatChannelBody,
    },
})
export default class PlatChannel extends AbstractView {
    constructor() {
        super(PlatChannelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
