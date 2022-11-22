<template>
    <el-dialog :title="title" :visible.sync="dialogData.bShow" width="900px">
        <el-table
            @sort-change="tableSortChange"
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
                :label="tableColumns['user_id'].name"
                prop="user_id"
                min-width="80px"
                class-name="status-col"
            >
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['stake_coin_name_unique'].name"
                prop="stake_coin_name_unique"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                sortable="custom"
                :label="tableColumns['total_stake_amount'].name"
                prop="total_stake_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                sortable="custom"
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
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import PlatStakeProxy from "../../../proxy/PlatStakeProxy";
import Pagination from "@/components/Pagination.vue";
import i18n from "@/lang";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUserLogDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    tableColumns = this.myProxy.stakeUserLogTableData.columns;
    tableData = this.myProxy.stakeUserLogTableData.list;
    listQuery = this.myProxy.stakeUserLogTableData.listQuery;
    pageInfo = this.myProxy.stakeUserLogTableData.pageInfo;
    dialogData = this.myProxy.stakeUserLogTableData.dialogData;

    title = LangUtil("质押详情");

    get rules() {
        return {};
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onStakeUserLogQuery();
    }
    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
    // 排序
    tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
        } else {
            order_by = {
                [column.prop]: "ASC",
            };
        }

        this.listQuery.page_count = 1;
        this.myProxy.onStakeUserLogQuery(order_by);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
