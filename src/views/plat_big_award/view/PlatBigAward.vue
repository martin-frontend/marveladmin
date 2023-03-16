<template>
    <div class="content">
        <PlatBigAwardDialog v-if="myProxy.dialogData.bShow"/>
        <PlatBigAwardHeader/>
        <PlatBigAwardBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatBigAwardMediator from "@/views/plat_big_award/mediator/PlatBigAwardMediator";
import PlatBigAwardProxy from "@/views/plat_big_award/proxy/PlatBigAwardProxy";
import { Component } from "vue-property-decorator";
import PlatBigAwardDialog from "./PlatBigAwardDialog.vue";
import PlatBigAwardHeader from "./PlatBigAwardHeader.vue";
import PlatBigAwardBody from "./PlatBigAwardBody.vue";

@Component({
    components: {
        PlatBigAwardDialog,
        PlatBigAwardHeader,
        PlatBigAwardBody,
    }
})
export default class PlatBigAward extends AbstractView {

    constructor() {
        super(PlatBigAwardMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatBigAwardProxy = this.getProxy(PlatBigAwardProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
