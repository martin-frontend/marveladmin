<template>
    <div class="content">
        <PlatActivityAwardDialog v-if="myProxy.dialogData.bShow" />
        <PlatActivityAwardHeader />
        <PlatActivityAwardBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatActivityAwardMediator from "@/views/plat_activity_award/mediator/PlatActivityAwardMediator";
import PlatActivityAwardProxy from "@/views/plat_activity_award/proxy/PlatActivityAwardProxy";
import { Component } from "vue-property-decorator";
import PlatActivityAwardDialog from "./PlatActivityAwardDialog.vue";
import PlatActivityAwardHeader from "./PlatActivityAwardHeader.vue";
import PlatActivityAwardBody from "./PlatActivityAwardBody.vue";

@Component({
    components: {
        PlatActivityAwardDialog,
        PlatActivityAwardHeader,
        PlatActivityAwardBody,
    },
})
export default class PlatActivityAward extends AbstractView {
    constructor() {
        super(PlatActivityAwardMediator);
        const { query } = this.$route;
        if (query.plat_id) {
            Object.assign(this.myProxy.listQuery, query);
        }
    }

    destroyed() {
        super.destroyed();
    }

    // proxy
    private myProxy: PlatActivityAwardProxy = this.getProxy(PlatActivityAwardProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
