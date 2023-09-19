<template>
    <div class="content">
        <PlatPopsDialog v-if="myProxy.dialogData.bShow"/>
        <PlatPopsHeader/>
        <PlatPopsBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatPopsMediator from "@/views/plat_pops/mediator/PlatPopsMediator";
import PlatPopsProxy from "../proxy/PlatPopsProxy";
import { Component } from "vue-property-decorator";
import PlatPopsDialog from "./PlatPopsDialog.vue";
import PlatPopsHeader from "./PlatPopsHeader.vue";
import PlatPopsBody from "./PlatPopsBody.vue";

@Component({
    components: {
        PlatPopsDialog,
        PlatPopsHeader,
        PlatPopsBody,
    }
})
export default class PlatPops extends AbstractView {

    constructor() {
        super(PlatPopsMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatPopsProxy = this.getProxy(PlatPopsProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
