<template>
    <div class="content plat_user">
        <PlatUserDialog v-if="myProxy.dialogData.bShow" />
        <PlatUserHeader />
        <PlatUserBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUserMediator from "@/views/plat_user/mediator/PlatUserMediator";
import { Component } from "vue-property-decorator";
import PlatUserDialog from "./PlatUserDialog.vue";
import PlatUserHeader from "./PlatUserHeader.vue";
import PlatUserBody from "./PlatUserBody.vue";
import PlatUserProxy from "../proxy/PlatUserProxy";

@Component({
    components: {
        PlatUserDialog,
        PlatUserHeader,
        PlatUserBody,
    },
})
export default class PlatUser extends AbstractView {
    // proxy
    private myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);

    constructor() {
        super(PlatUserMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
