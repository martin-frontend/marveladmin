<template>
    <el-tabs v-model="myProxy.tabName" @tab-click="handleClick">
        <el-tab-pane :label="LangUtil('按渠道')" name="channel">
            <StatisticPlatDaysDeliverChannelByChannelTable />
        </el-tab-pane>
        <!-- <el-tab-pane :label="LangUtil('按团队')" name="group">
            <StatisticPlatDaysDeliverChannelByGroupTable />
        </el-tab-pane> -->
    </el-tabs>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
// import StatisticPlatDaysDeliverChannelProxy from "../proxy/StatisticPlatDaysDeliverChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import StatisticPlatDaysDeliverChannelByChannelTable from "./components/StatisticPlatDaysDeliverChannelByChannelTable.vue";
import StatisticPlatDaysDeliverChannelByGroupTable from "./components/StatisticPlatDaysDeliverChannelByGroupTable.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
        StatisticPlatDaysDeliverChannelByChannelTable,
        StatisticPlatDaysDeliverChannelByGroupTable,
    },
})
export default class StatisticPlatDaysDeliverChannelBody extends AbstractView {
    LangUtil = LangUtil;
    myProxy = this.$parent.myProxy;

    handleClick() {
        this.myProxy.onChangeTab();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
