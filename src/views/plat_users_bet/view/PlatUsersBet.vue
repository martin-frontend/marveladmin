<template>
    <div class="content">
        <PlatUserBetDetail :tableColumns="tableColumns" :data="myProxy.dialogData"></PlatUserBetDetail>
        <PlatUsersBetHeader />
        <PlatUsersBetBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import PlatUsersBetMediator from "@/views/plat_users_bet/mediator/PlatUsersBetMediator";
import PlatUsersBetProxy from "@/views/plat_users_bet/proxy/PlatUsersBetProxy";
import { Component } from "vue-property-decorator";
import PlatUserBetDetail from "@/views/plat_users_bet/view/PlatUserBetDetail.vue";
import PlatUsersBetHeader from "./PlatUsersBetHeader.vue";
import PlatUsersBetBody from "./PlatUsersBetBody.vue";

@Component({
    components: {
        PlatUserBetDetail,
        PlatUsersBetHeader,
        PlatUsersBetBody,
    },
})
export default class PlatUsersBet extends AbstractView {
    constructor() {
        super(PlatUsersBetMediator);
    }

    destroyed() {
        super.destroyed();
    }
    // proxy
    private myProxy: PlatUsersBetProxy = this.getProxy(PlatUsersBetProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
