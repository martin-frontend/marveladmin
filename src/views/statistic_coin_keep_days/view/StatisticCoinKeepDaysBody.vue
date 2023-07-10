<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            :row-class-name="rowClassName"
        >
            <el-table-column prop="created_date" :label="LangUtil('日期')" align="center" min-width="120px">
            </el-table-column>
            <el-table-column prop="plat_id" :label="LangUtil('平台')" align="center" min-width="120px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.channel_id.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ channelName(row) }} </template>
            </el-table-column>
            <el-table-column prop="user_count" :label="tableColumns.user_count.name" align="center" min-width="60px">
            </el-table-column>
            <el-table-column prop="user_all_count" :label="tableColumns.user_all_count.name" align="center" min-width="60px">
            </el-table-column>
            <!-- <el-table-column prop="coin_name_unique" :label="tableColumns.coin_name_unique.name" align="center" min-width="60px">
            </el-table-column> -->
            <el-table-column prop="day_1" :label="tableColumns.day_1.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_1 }}({{ toPercent(row.day_1, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_2" :label="tableColumns.day_2.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_2 }}({{ toPercent(row.day_2, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_3" :label="tableColumns.day_3.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_3 }}({{ toPercent(row.day_3, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_4" :label="tableColumns.day_4.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_4 }}({{ toPercent(row.day_4, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_5" :label="tableColumns.day_5.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_5 }}({{ toPercent(row.day_5, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_6" :label="tableColumns.day_6.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_6 }}({{ toPercent(row.day_6, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_7" :label="tableColumns.day_7.name" align="center" min-width="80px">
                <template slot-scope="{ row }"> {{ row.day_7 }}({{ toPercent(row.day_7, row.user_count) }}) </template>
            </el-table-column>
            <el-table-column prop="day_14" :label="tableColumns.day_14.name" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.day_14 }}({{ toPercent(row.day_14, row.user_count) }})
                </template>
            </el-table-column>
            <el-table-column prop="day_30" :label="tableColumns.day_30.name" align="center" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.day_30 }}({{ toPercent(row.day_30, row.user_count) }})
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticCoinKeepDaysProxy from "../proxy/StatisticCoinKeepDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    }
})
export default class StatisticCoinKeepDaysBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticCoinKeepDaysProxy = this.getProxy(StatisticCoinKeepDaysProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    handlerPageSwitch(page:number){
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
    channelName(row: any): string {
        if (row.channel_id == 0 || row.channel_id == "0") {
            return LangUtil("全部渠道");
        }
        return row.channel_id;
    }
    rowClassName({ row, rowIndex }): string {
        // 在这里判断是否应用 'highlight-row' 类名
        // 假设符合条件的行具有 isHighlighted 属性
        if (row.channel_id == 0 || row.channel_id == "0") {
            // if (row.channel_id == 30037001 || row.channel_id == "30037001") {
            return "highlight-row";
        }
        return "";
    }
    toPercent(curAmount: string, total: string) {
        return this.myProxy.toPercent(curAmount,total);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

::v-deep .highlight-row {
    background-color: #f6f7fa !important;
}
</style>
