<template>
    <div class="content">
        <PlatBackwaterHeader/>
        <PlatBackwaterBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBackwaterMediator from "@/views/plat_backwater/mediator/PlatBackwaterMediator";
import { Component } from "vue-property-decorator";
import PlatBackwaterHeader from "./PlatBackwaterHeader.vue";
import PlatBackwaterBody from "./PlatBackwaterBody.vue";

@Component({
    components: {
        PlatBackwaterHeader,
        PlatBackwaterBody,
    }
})
export default class PlatBackwater extends AbstractView {

    constructor() {
        super(PlatBackwaterMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
