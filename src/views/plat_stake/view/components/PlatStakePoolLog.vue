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
                :label="tableColumns['start_time'].name"
                prop="start_time"
                min-width="90px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['end_time'].name"
                prop="end_time"
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
                :label="tableColumns['put_in_ratio'].name"
                prop="put_in_ratio"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_bonus_amount'].name"
                prop="total_bonus_amount"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }">
                    <div v-if="row.status == 2">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(row)"
                            v-if="checkUnique(unique.admin_user_show)"
                            >{{ LangUtil("设置") }}</el-button
                        >
                    </div>
                    <div v-else>-</div>
                </template>
            </el-table-column>
        </el-table>
        <PlatPoolDialog v-if="dialogData.bShow" />
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
import PlatPoolDialog from "./dialog/PlatPoolDialog.vue";

@Component({
    components: {
        PlatPoolDialog,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "info",
                2: "success",
                3: "success",
                4: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatStakePoolLog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    tableColumns = this.myProxy.stakePooltableData.columns;
    tableData = this.myProxy.stakePooltableData.list;
    pageInfo = this.myProxy.stakePooltableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    dialogData = this.myProxy.stakePooltableData.dialogData;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onStakePoolQuery();
    }
    handleEdit(data: any) {
        this.myProxy.showPoolDialog(data);
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
