<template>
    <div class="content plat_activity_model">
        <PlatActivityModelDialog />
        <PlatActivityModelHeader />
        <PlatActivityModelBody />
        <PlatSettingDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityModelMediator from "@/views/plat_activity_model/mediator/PlatActivityModelMediator";
import { Component } from "vue-property-decorator";
import PlatActivityModelDialog from "./PlatActivityModelDialog.vue";
import PlatActivityModelHeader from "./PlatActivityModelHeader.vue";
import PlatActivityModelBody from "./PlatActivityModelBody.vue";
import PlatSettingDialog from "./PlatSettingDialog.vue";

@Component({
    components: {
        PlatActivityModelDialog,
        PlatActivityModelHeader,
        PlatActivityModelBody,
        PlatSettingDialog,
    },
})
export default class PlatActivityModel extends AbstractView {
    constructor() {
        super(PlatActivityModelMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
