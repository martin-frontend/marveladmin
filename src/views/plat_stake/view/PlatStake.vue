<template>
    <div class="content">
        <PlatUserLogDialog v-if="userLogDialogData.bShow" />
        <PlatBonusUserLogDialog v-if="bonusUserLogDialogData.bShow" />
        <PlatStakeHeader />
        <PlatStakeBody />
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
import PlatUserLogDialog  from "./components/dialog/PlatUserLogDialog.vue";
import PlatBonusUserLogDialog from "./components/dialog/PlatBonusUserLogDialog.vue";

@Component({
    components: {
        PlatUserLogDialog,
        PlatBonusUserLogDialog,
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
    // proxy property
    private userLogDialogData = this.myProxy.stakeUserLogTableData.dialogData;
    private bonusUserLogDialogData = this.myProxy.stakeBonusUserLogtableData.dialogData;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
