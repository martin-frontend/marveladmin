<template>
    <div class="content">
        <TabCommissionHeader />
        <TabCommissionBody />
        <TabCommissionDialog v-if="myProxy.dialogData.bShow"/>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCommissionMediator from "../mediator/TabCommissionMediator";
import TabCommissionProxy from "../proxy/TabCommissionProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import TabCommissionHeader from "./TabCommissionHeader.vue";
import TabCommissionBody from "./TabCommissionBody.vue";
import TabCommissionDialog from "./TabCommissionDialog.vue";

@Component({
    components: {
        TabCommissionBody,
        TabCommissionHeader,
        TabCommissionDialog
    },
})
export default class TabCommission extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);

    constructor() {
        super(TabCommissionMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
