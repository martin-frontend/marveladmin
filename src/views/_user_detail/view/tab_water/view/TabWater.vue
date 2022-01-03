<template>
    <div class="content">
        <TabWaterHeader />
        <TabWaterBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabWaterMediator from "../mediator/TabWaterMediator";
import TabWaterProxy from "../proxy/TabWaterProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import TabWaterHeader from "./TabWaterHeader.vue";
import TabWaterBody from "./TabWaterBody.vue";

@Component({
    components: {
        TabWaterHeader,
        TabWaterBody,
    },
})
export default class TabWater extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabWaterProxy = getProxy(TabWaterProxy);

    constructor() {
        super(TabWaterMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
