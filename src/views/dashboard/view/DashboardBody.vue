<template>
    <div>
        <PanelGroup />
        <Chart />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import DashboardProxy from "../proxy/DashboardProxy";
import GlobalVar from "@/core/global/GlobalVar";
import PanelGroup from "./components/PanelGroup.vue";
import Chart from "./components/Chart.vue";

@Component({
    components: {
        PanelGroup,
        Chart,
    },
})
export default class DashboardBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: DashboardProxy = this.getProxy(DashboardProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private listQuery = this.myProxy.listQuery;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
