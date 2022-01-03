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
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[2].name"
                prop="2"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[4].name"
                prop="4"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[8].name"
                prop="8"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[16].name"
                prop="16"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[32].name"
                prop="32"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[64].name"
                prop="64"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission[128].name"
                prop="128"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission.total_commission.name"
                prop="total_commission"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column prop="date" :label="$t('common.operating')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button v-if="row.date != `合计`" type="primary" @click="handlerDetail(row)" size="small">{{
                        $t("common.detail")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabCommissionProxy from "../proxy/TabCommissionProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class TabCommissionBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabCommissionProxy = getProxy(TabCommissionProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private listQuery = this.myProxy.listQuery;

    private handlerDetail(row: any) {
        this.myProxy.showDetail(row);
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
