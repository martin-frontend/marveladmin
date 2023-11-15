<template>
    <el-tabs v-model="myProxy.tabName" @tab-click="handleClick">
        <el-tab-pane :label="LangUtil('按渠道统计')" name="channel">
            <StatisticPlatDaysChannelCoreChannelChannelBody />
        </el-tab-pane>
        <el-tab-pane :label="LangUtil('按团队统计')" name="group">
            <StatisticPlatDaysChannelCoreChannelGroupBody />
        </el-tab-pane>
    </el-tabs>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDaysChannelCoreChannelProxy from "../proxy/StatisticPlatDaysChannelCoreChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import StatisticPlatDaysChannelCoreChannelChannelBody from "./components/StatisticPlatDaysChannelCoreChannelChannelBody.vue";
import StatisticPlatDaysChannelCoreChannelGroupBody from "./components/StatisticPlatDaysChannelCoreChannelGroupBody.vue";

@Component({
    components: {
        Pagination,
        StatisticPlatDaysChannelCoreChannelChannelBody,
        StatisticPlatDaysChannelCoreChannelGroupBody,
    },
})
export default class StatisticPlatDaysChannelCoreChannelBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDaysChannelCoreChannelProxy = this.getProxy(StatisticPlatDaysChannelCoreChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handleClick() {
        this.myProxy.onChangeTab();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
