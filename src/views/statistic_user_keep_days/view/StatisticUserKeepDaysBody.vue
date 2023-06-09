<template>
    <div>
        <el-tabs v-model="myProxy.tableData.activeName">
            <el-tab-pane :label="platTag" :name="StatisticTab.User"> </el-tab-pane>
            <el-tab-pane :label="gameTag" :name="StatisticTab.Recharge"> </el-tab-pane>
        </el-tabs>
        <UserKeepDays v-if="myProxy.isUser" />
        <RechargeKeepDays v-else />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticUserKeepDaysProxy from "../proxy/StatisticUserKeepDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { StatisticTab } from "../proxy/IStatisticUserKeepDaysProxy";
import RechargeKeepDays from "./components/RechargeKeepDays/RechargeKeepDays.vue";
import UserKeepDays from "./components/UserKeepDays/UserKeepDays.vue";

@Component({
    components: {
        Pagination,
        UserKeepDays,
        RechargeKeepDays,
    },
})
export default class StatisticUserKeepDaysBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticUserKeepDaysProxy = this.getProxy(StatisticUserKeepDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    StatisticTab = StatisticTab;

    toPercent(curAmount: string, total: string) {
        if (total == "0" || curAmount == "0") {
            return "0%";
        }
        return ((Number(curAmount) / Number(total)) * 100).toFixed(2) + "%";
    }
    // 页签
    get platTag() {
        //return this.LangUtil("用户留存");
        return this.tableColumns.type.options[StatisticTab.User];
    }
    get gameTag() {
        //return this.LangUtil("充值留存");
        return this.tableColumns.type.options[StatisticTab.Recharge];
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
