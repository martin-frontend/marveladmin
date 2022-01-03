<template>
    <div v-loading="net_status.loading">
        <el-radio-group v-model="activeName">
            <el-radio label="water">{{ $t("gold_water.water") }}</el-radio>
            <el-radio label="win_loss">{{ $t("user_detail.gameResult") }}</el-radio>
            <el-radio label="bet">{{ $t("user_detail.valid") }}</el-radio>
        </el-radio-group>
        <WaterTable v-if="isWater" :tableData="tableData" :columnInfo="tableColumns" />
        <WinLossTable v-if="isWinLoss" :tableData="tableData" :columnInfo="tableColumns" />
        <BetTable v-if="isBet" :tableData="tableData" :columnInfo="tableColumns" />
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import TabWaterProxy from "../proxy/TabWaterProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import { getProxy } from "@/views/_user_detail/PageSetting";
import WaterTable from "./components/WaterTable.vue";
import BetTable from "./components/BetTable.vue";
import WinLossTable from "./components/WinLossTable.vue";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        WaterTable,
        BetTable,
        WinLossTable,
        Pagination,
    },
})
export default class TabWaterBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabWaterProxy = getProxy(TabWaterProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    get isWater() {
        return this.activeName == "water";
    }
    get isWinLoss() {
        return this.activeName == "win_loss";
    }
    get isBet() {
        return this.activeName == "bet";
    }
    private activeName = "water";

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";

div:first-child {
    margin-bottom: 16px;
}
</style>
