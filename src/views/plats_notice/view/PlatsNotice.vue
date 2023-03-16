<template>
    <div class="content plats_notice">
        <PlatsNoticeDialog  v-if="myProxy.dialogData.bShow"/>
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
import PlatsNoticeProxy from "@/views/plats_notice/proxy/PlatsNoticeProxy";

@Component({
    components: {
        PlatsNoticeDialog,
        PreviewImageDialog,
        PlatsNoticeHeader,
        PlatsNoticeBody,
    },
})
export default class PlatsNotice extends AbstractView {
    myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);

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
