<template>
    <div>
        <el-table
            :data="myProxy.tableData.list"
            style="width: 100%"
            border
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column
                :label="tableColumns.commission.date.name"
                prop="date"
                class-name="status-col"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.commission.direct_water.name"
                prop="direct_water"
                class-name="status-col"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.commission.group_water.name"
                prop="group_water"
                class-name="status-col"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.commission.total_commission.name" min-width="80px">
                <template slot-scope="{ row }">
                    <div v-for="(value, key) in row.total_commission" :key="key" :label="value.name" :value="key">
                        {{ key }}:{{ value }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.commission.total_water.name"
                prop="total_water"
                class-name="status-col"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column prop="date" :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button v-if="row.date != `合计`" type="primary" @click="handlerDetail(row)" size="small">{{
                        LangUtil("详情")
                    }}</el-button>
                    <template v-else> - </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCommissionProxy from "../proxy/TabCommissionProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class TabCommissionBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    listQuery = this.myProxy.listQuery;

    handlerDetail(row: any) {
        this.myProxy.showDetail(row);
    }

    getAccessInfo(data: any) {
        let infoStr = "";
        if (data) {
            const keys = Object.keys(data);
            for (const key of keys) {
                infoStr += key + "：";
                infoStr += data[key] + "<br>";
            }
        }
        return infoStr;
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
