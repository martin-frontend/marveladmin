<template>
    <div class="content plats_notice">
        <PlatsNoticeDialog />
        <PlatsNoticeHeader />
        <PlatsNoticeBody />
        <PreviewImageDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatsNoticeMediator from "@/views/plats_notice/mediator/PlatsNoticeMediator";
import { Component } from "vue-property-decorator";
import PlatsNoticeDialog from "./PlatsNoticeDialog.vue";
import PlatsNoticeHeader from "./PlatsNoticeHeader.vue";
import PlatsNoticeBody from "./PlatsNoticeBody.vue";
import PreviewImageDialog from "./components/PreviewImageDialog.vue";

@Component({
    components: {
        PlatsNoticeDialog,
        PreviewImageDialog,
        PlatsNoticeHeader,
        PlatsNoticeBody,
    },
})
export default class PlatsNotice extends AbstractView {
    constructor() {
        super(PlatsNoticeMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
