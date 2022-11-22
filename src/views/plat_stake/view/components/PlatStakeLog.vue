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
            <el-table-column :label="tableColumns['plat_id'].name" min-width="80px" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template></el-table-column
            >
            <el-table-column
                :label="tableColumns['start_date'].name"
                prop="start_date"
                min-width="90px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['end_date'].name"
                prop="end_date"
                min-width="90px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column :label="tableColumns['status'].name" min-width="60px" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template></el-table-column
            >
            <el-table-column
                :label="tableColumns['stake_count'].name"
                prop="stake_count"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['stake_coin_name_unique'].name"
                prop="stake_coin_name_unique"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_stake_amount'].name"
                prop="total_stake_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['validate_stake_amount'].name"
                prop="validate_stake_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_transfer_fee_amount'].name"
                prop="total_transfer_fee_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show)"
                        >{{ LangUtil("详情") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <PlatUserLogDialog v-if="dialogData.bShow" />
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatStakeProxy from "../../proxy/PlatStakeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatUserLogDialog from "../components/dialog/PlatUserLogDialog.vue";

@Component({
    components: {
        PlatUserLogDialog,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "info",
                2: "success",
                3: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatStakeLog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    tableColumns = this.myProxy.stakeLogtableData.columns;
    tableData = this.myProxy.stakeLogtableData.list;
    pageInfo = this.myProxy.stakeLogtableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    dialogData = this.myProxy.stakeUserLogTableData.dialogData;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
    handleEdit(data: any) {
        this.myProxy.showUserLogDialog({
            plat_id: data.plat_id,
            plat_stake_log_id: data.id,
        });
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
