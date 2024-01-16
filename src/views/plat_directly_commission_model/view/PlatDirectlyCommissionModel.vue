<template>
    <div class="content">
        <PlatDirectlyCommissionModelDialog v-if="myProxy.dialogData.bShow"/>
        <PlatDirectlyCommissionModelHeader/>
        <PlatDirectlyCommissionModelBody/>
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatDirectlyCommissionModelMediator from "@/views/plat_directly_commission_model/mediator/PlatDirectlyCommissionModelMediator";
import PlatDirectlyCommissionModelProxy from "../proxy/PlatDirectlyCommissionModelProxy";
import { Component } from "vue-property-decorator";
import PlatDirectlyCommissionModelDialog from "./PlatDirectlyCommissionModelDialog.vue";
import PlatDirectlyCommissionModelHeader from "./PlatDirectlyCommissionModelHeader.vue";
import PlatDirectlyCommissionModelBody from "./PlatDirectlyCommissionModelBody.vue";

@Component({
    components: {
        PlatDirectlyCommissionModelDialog,
        PlatDirectlyCommissionModelHeader,
        PlatDirectlyCommissionModelBody,
    }
})
export default class PlatDirectlyCommissionModel extends AbstractView {

    constructor() {
        super(PlatDirectlyCommissionModelMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatDirectlyCommissionModelProxy = this.getProxy(PlatDirectlyCommissionModelProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
