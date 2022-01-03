<template>
    <div class="content">
        <PlatSettingHeader />
        <PlatSettingBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatSettingMediator from "@/views/plat_setting/mediator/PlatSettingMediator";
import { Component } from "vue-property-decorator";
import PlatSettingHeader from "./PlatSettingHeader.vue";
import PlatSettingBody from "./PlatSettingBody.vue";

@Component({
    components: {
        PlatSettingHeader,
        PlatSettingBody,
    },
})
export default class PlatSetting extends AbstractView {
    constructor() {
        super(PlatSettingMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
