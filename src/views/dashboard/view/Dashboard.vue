<template>
    <div class="content dashboard">
        <DashboardHeader />
        <DashboardBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import DashboardMediator from "@/views/dashboard/mediator/DashboardMediator";
import DashboardProxy from "@/views/dashboard/proxy/DashboardProxy";
import { Component } from "vue-property-decorator";
import DashboardHeader from "./DashboardHeader.vue";
import DashboardBody from "./DashboardBody.vue";

@Component({
    components: {
        DashboardHeader,
        DashboardBody,
    },
})
export default class Dashboard extends AbstractView {
    constructor() {
        super(DashboardMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: DashboardProxy = this.getProxy(DashboardProxy);
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
