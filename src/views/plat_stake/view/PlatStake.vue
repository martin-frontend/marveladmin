<template>
    <div class="content">
        <PlatUserLogDialog v-if="myProxy.dialogData.bShow"/>
        <PlatStakeHeader/>
        <PlatStakeBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatStakeMediator from "@/views/plat_stake/mediator/PlatStakeMediator";
import PlatStakeProxy from "../proxy/PlatStakeProxy";
import { Component } from "vue-property-decorator";
import PlatStakeDialog from "./PlatStakeDialog.vue";
import PlatStakeHeader from "./PlatStakeHeader.vue";
import PlatStakeBody from "./PlatStakeBody.vue";
import PlatUserLogDialog  from "./components/PlatUserLogDialog.vue";

@Component({
    components: {
        PlatUserLogDialog,
        PlatStakeHeader,
        PlatStakeBody,
    }
})
export default class PlatStake extends AbstractView {

    constructor() {
        super(PlatStakeMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
