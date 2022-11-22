<template>
    <div class="content">
        <SystemFagDialog />
        <SystemFagHeader />
        <SystemFagBody ref="body" />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SystemFagMediator from "@/views/system_fag/mediator/SystemFagMediator";
import { Component } from "vue-property-decorator";
import SystemFagDialog from "./SystemFagDialog.vue";
import SystemFagHeader from "./SystemFagHeader.vue";
import SystemFagBody from "./SystemFagBody.vue";

@Component({
    components: {
        SystemFagDialog,
        SystemFagHeader,
        SystemFagBody,
    },
})
export default class SystemFag extends AbstractView {
    constructor() {
        super(SystemFagMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
