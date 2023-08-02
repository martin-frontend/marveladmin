<template>
    <div>
        <el-tabs v-model="myProxy.chartData.activeName" @tab-click="handleClick">
            <el-tab-pane :label="LangUtil('平台充值')" name="first">{{ LangUtil("平台充值") }}</el-tab-pane>
            <el-tab-pane :label="LangUtil('平台兑换')" name="second">{{ LangUtil("平台兑换") }}</el-tab-pane>
        </el-tabs>
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
// import CountTo from "vue-count-to";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import DashboardProxy from "@/views/dashboard/proxy/DashboardProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import echarts from "echarts";

@Component
export default class DashboardDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: DashboardProxy = this.getProxy(DashboardProxy);

    handleClick(value: any) {
        // console.log(value);
        this.myProxy.chartData.activeName = value.name;
        this.myProxy.showChart();
    }

    @Watch("myProxy.chartData.number")
    onChartInit() {
        let chartDome = this.$refs.chart;
        let myChart = echarts.init(chartDome);
        myChart.clear();
        myChart.setOption(this.myProxy.chartData.options);
        window.onresize = function() {
            myChart.resize();
        };
    }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 300px;
    margin-bottom: 30px;
}
</style>
