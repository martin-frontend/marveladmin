<template>
    <div>
        <el-tabs v-model="myProxy.tableData.activeName">
            <el-tab-pane :label="platTag" :name="StatisticTab.Plat"> </el-tab-pane>
            <el-tab-pane :label="gameTag" :name="StatisticTab.Game"> </el-tab-pane>
        </el-tabs>
        <StatisticPlat v-if="myProxy.isPlat" />
        <StatisticGame v-else />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticBetPlatDaysProxy from "../proxy/StatisticBetPlatDaysProxy";
import GlobalVar from "@/core/global/GlobalVar";
import StatisticPlat from "./components/StatisticPlat/StatisticPlat.vue";
import StatisticGame from "./components/StatisticGame/StatisticGame.vue";
import { StatisticTab } from "../proxy/IStatisticBetPlatDaysProxy";

@Component({
    components: {
        StatisticPlat,
        StatisticGame,
    },
})
export default class StatisticBetPlatDaysBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticBetPlatDaysProxy = this.getProxy(StatisticBetPlatDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    private StatisticTab = StatisticTab;

    // 页签
    get platTag() {
        return this.tableData.columns.type.options[StatisticTab.Plat];
    }
    get gameTag() {
        return this.tableData.columns.type.options[StatisticTab.Game];
    }

    @Watch("myProxy.tableData.activeName")
    tabChange() {
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
