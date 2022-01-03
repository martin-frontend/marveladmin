<template>
    <div class="content">
        <RechargePlatsPaymethodsHeader />
        <RechargePlatsPaymethodsBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import RechargePlatsPaymethodsMediator from "@/views/recharge_plats_paymethods/mediator/RechargePlatsPaymethodsMediator";
import { Component } from "vue-property-decorator";
import RechargePlatsPaymethodsProxy from "../proxy/RechargePlatsPaymethodsProxy";
import RechargePlatsPaymethodsHeader from "./RechargePlatsPaymethodsHeader.vue";
import RechargePlatsPaymethodsBody from "./RechargePlatsPaymethodsBody.vue";

@Component({
    components: {
        RechargePlatsPaymethodsHeader,
        RechargePlatsPaymethodsBody,
    },
})
export default class RechargePlatsPaymethods extends AbstractView {
    constructor() {
        super(RechargePlatsPaymethodsMediator);
    }

    // proxy
    private myProxy: RechargePlatsPaymethodsProxy = this.getProxy(RechargePlatsPaymethodsProxy);

    private nextTick() {
        this.$nextTick(() => {
            this.myProxy.tableData.list = [];
            this.myProxy.sortableDate.sortable = false;
            this.myProxy.onQuery();
        });
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
