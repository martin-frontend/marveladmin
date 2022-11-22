<template>
    <div class="content">
        <SystemConfigDialog />
        <SystemConfigHeader />
        <SystemConfigBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import SystemConfigMediator from "@/views/system_config/mediator/SystemConfigMediator";
import { Component } from "vue-property-decorator";
import SystemConfigDialog from "./SystemConfigDialog.vue";
import SystemConfigHeader from "./SystemConfigHeader.vue";
import SystemConfigBody from "./SystemConfigBody.vue";

@Component({
    components: {
        SystemConfigDialog,
        SystemConfigHeader,
        SystemConfigBody,
    },
})
export default class SystemConfig extends AbstractView {
    constructor() {
        super(SystemConfigMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
