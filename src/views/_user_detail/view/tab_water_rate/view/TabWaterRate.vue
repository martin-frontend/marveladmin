<template>
    <div class="content">
        <TabWaterRateBody />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import TabWaterRateProxy from "../proxy/TabWaterRateProxy";
import TabWaterRateBody from "./TabWaterRateBody.vue";
import TaWaterRateMediator from "../mediator/TabWaterRateMediator";

@Component({
    components: {
        TabWaterRateBody,
    },
})
export default class TabWaterRate extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabWaterRateProxy = getProxy(TabWaterRateProxy);

    constructor() {
        super(TaWaterRateMediator);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
