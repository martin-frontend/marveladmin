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
            <el-table-column :label="tableColumns['date_number'].name" prop="date_number" class-name="status-col">
            </el-table-column>
            <el-table-column
                sortable="custom"
                :label="tableColumns['start_time'].name"
                prop="start_time"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                sortable="custom"
                :label="tableColumns['end_time'].name"
                prop="end_time"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
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
import CreditDividendPeriodProxy from "../proxy/CreditDividendPeriodProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class CreditDividendPeriodBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CreditDividendPeriodProxy = this.getProxy(CreditDividendPeriodProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
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
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
