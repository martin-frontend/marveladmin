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
            @sort-change="tableSortChange"
        >
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" prop="plat_id">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.user_id.name}`" class-name="status-col" prop="user_id">
                <template slot-scope="{ row }">
                    <div>
                        <span
                            @click="showUserDetail(row.user_id)"
                            style="cursor: pointer; text-decoration: underline"
                            >{{ row.user_id }}</span
                        >
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.nick_name.name}`" class-name="status-col" prop="nick_name">
            </el-table-column>

            <el-table-column
                :label="`${tableColumns.total_recharge.name}`"
                class-name="status-col"
                prop="total_recharge"
                sortable="custom"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.total_exchange.name}`"
                class-name="status-col"
                prop="total_exchange"
                sortable="custom"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.total_water.name}`"
                sortable="custom"
                class-name="status-col"
                prop="total_water"
            >
            </el-table-column>
            <el-table-column
                sortable="custom"
                :label="`${tableColumns.total_win.name}`"
                class-name="status-col"
                prop="total_win"
            >
                <template slot-scope="{ row }">
                    <div>
                        <WinLossDisplay :amount="row.total_win" />
                    </div>
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
import PlatUserStatisticDaysProxy from "../proxy/PlatUserStatisticDaysProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class PlatUserStatisticDaysBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUserStatisticDaysProxy = this.getProxy(PlatUserStatisticDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }

    // 排序
    private tableSortChange(column: any) {
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
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.onQuery();
    }

    private handleEdit(data: object) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
