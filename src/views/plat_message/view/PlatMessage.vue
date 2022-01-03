<template>
    <div class="content">
        <PlatMessageHeader/>
        <PlatMessageBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatMessageMediator from "@/views/plat_message/mediator/PlatMessageMediator";
import PlatMessageProxy from "@/views/plat_message/proxy/PlatMessageProxy";
import { Component } from "vue-property-decorator";
import PlatMessageHeader from "./PlatMessageHeader.vue";
import PlatMessageBody from "./PlatMessageBody.vue";

@Component({
    components: {
        PlatMessageHeader,
        PlatMessageBody,
    }
})
export default class PlatMessage extends AbstractView {

    constructor() {
        super(PlatMessageMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatMessageProxy = this.getProxy(PlatMessageProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
