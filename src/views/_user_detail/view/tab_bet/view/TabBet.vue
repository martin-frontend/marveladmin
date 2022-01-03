<template>
    <div class="content">
        <TabBetHeader />
        <TabBetBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabBetMediator from "../mediator/TabBetMediator";
import TabBetProxy from "../proxy/TabBetProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import TabBetHeader from "../view/TabBetHeader.vue";
import TabBetBody from "../view/TabBetBody.vue";

@Component({
    components: {
        TabBetHeader,
        TabBetBody
    },
})
export default class TabBet extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabBetProxy = getProxy(TabBetProxy);

    constructor() {
        super(TabBetMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
