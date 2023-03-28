<template>
    <div class="content">
        <PlatActivityDialog v-if="myProxy.dialogData.bShow" />
        <PlatActivityHeader />
        <PlatActivityBody />
        <PlatActivityLanguagesDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityMediator from "@/views/plat_activity/mediator/PlatActivityMediator";
import PlatActivityProxy from "@/views/plat_activity/proxy/PlatActivityProxy";
import { Component } from "vue-property-decorator";
import PlatActivityDialog from "./PlatActivityDialog.vue";
import PlatActivityHeader from "./PlatActivityHeader.vue";
import PlatActivityBody from "./PlatActivityBody.vue";
import PlatActivityLanguagesDialog from "./PlatActivityLanguagesDialog.vue";

@Component({
    components: {
        PlatActivityDialog,
        PlatActivityHeader,
        PlatActivityBody,
        PlatActivityLanguagesDialog,
    },
})
export default class PlatActivity extends AbstractView {
    constructor() {
        super(PlatActivityMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatActivityProxy = this.getProxy(PlatActivityProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
