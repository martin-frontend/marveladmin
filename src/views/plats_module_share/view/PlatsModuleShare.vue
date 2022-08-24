<template>
    <div>
        <PlatsModuleShareDialog />
        <PlatsModuleShareHeader />
        <PlatsModuleShareBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatsModuleShareMediator from "@/views/plats_module_share/mediator/PlatsModuleShareMediator";
import { Component } from "vue-property-decorator";
import PlatsModuleShareDialog from "./PlatsModuleShareDialog.vue";
import PlatsModuleShareHeader from "./PlatsModuleShareHeader.vue";
import PlatsModuleShareBody from "./PlatsModuleShareBody.vue";

@Component({
    components: {
        PlatsModuleShareDialog,
        PlatsModuleShareHeader,
        PlatsModuleShareBody,
    },
})
export default class PlatsModuleShare extends AbstractView {
    constructor() {
        super(PlatsModuleShareMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
