<template>
    <div v-loading="net_status.loading">
        <el-radio-group v-model="activeName">
            <el-radio label="water">{{ LangUtil("打码流水") }}</el-radio>
            <el-radio label="win_loss">{{ LangUtil("游戏输赢") }}</el-radio>
            <el-radio label="bet">{{ LangUtil("有效投注") }}</el-radio>
        </el-radio-group>
        <WaterTable v-if="isWater" :tableData="tableData" :columnInfo="tableColumns" />
        <WinLossTable v-if="isWinLoss" :tableData="tableData" :columnInfo="tableColumns" />
        <BetTable v-if="isBet" :tableData="tableData" :columnInfo="tableColumns" />
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabWaterProxy = getProxy(TabWaterProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    get isWater() {
        return this.activeName == "water";
    }
    get isWinLoss() {
        return this.activeName == "win_loss";
    }
    get isBet() {
        return this.activeName == "bet";
    }
    activeName = "water";

    handlerPageSwitch(page: number) {
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
