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
        >
            <el-table-column prop="created_date" :label="$t('common.date')" align="center" min-width="120px">
            </el-table-column>
            <el-table-column prop="plat_id" :label="$t('common.plat')" align="center" min-width="120px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="user_count" :label="tableColumns.user_count.name" align="center" min-width="60px">
            </el-table-column>
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
import StatisticUserKeepDaysProxy from "../proxy/StatisticUserKeepDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class StatisticUserKeepDaysBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticUserKeepDaysProxy = this.getProxy(StatisticUserKeepDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private toPercent(curAmount: string, total: string) {
        if (total == "0" || curAmount == "0") {
            return "0%";
        }
        return ((Number(curAmount) / Number(total)) * 100).toFixed(2) + "%";
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
