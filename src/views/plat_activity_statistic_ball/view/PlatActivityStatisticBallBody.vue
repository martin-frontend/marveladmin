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
            <el-table-column :label="tableColumns.plat_id.name" prop="" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.activity_id.name" prop="activity_id" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.activity_name.name" prop="activity_name" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.current_cycle.name" prop="current_cycle" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.start_time.name" prop="start_time" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.end_time.name" prop="end_time" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.coin_unique.name" prop="coin_unique" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.prize_pool_amount.name" prop="prize_pool_amount" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.join_user_num.name" prop="join_user_num" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.init_user_num.name" prop="init_user_num" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.total_cons.name" prop="total_cons" align="center"> </el-table-column>
            <el-table-column :label="tableColumns.total_award.name" prop="total_award" align="center"> </el-table-column>

            <el-table-column :label="tableColumns.cycle_status.name" prop="" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.cycle_status.options[row.cycle_status] }}</div>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" :width="120" align="center">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        :disabled="!checkUnique(unique.plat_activity_statistic_ball_user)"
                        @click="showDialogBallUser(row)"
                    >
                        {{ LangUtil("参与玩家") }}
                    </el-button>
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
import PlatActivityStatisticBallProxy from "../proxy/PlatActivityStatisticBallProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatActivityStatisticBallBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityStatisticBallProxy = this.getProxy(PlatActivityStatisticBallProxy);
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

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
    showDialogBallUser(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
