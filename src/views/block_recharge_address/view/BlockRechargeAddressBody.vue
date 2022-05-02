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
            <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" width="60px">
            </el-table-column>
            <el-table-column
                prop="address"
                :label="`${tableColumns.address.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column prop="block_network_id" :label="`${tableColumns.block_network_id.name}`" class-name="status-col" width="150px">
                <template slot-scope="{ row }">
                    {{ tableColumns.block_network_id.options[row.block_network_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="coin_name_unique" :label="`${tableColumns.coin_name_unique.name}`" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    {{ tableColumns.coin_name_unique.options[row.coin_name_unique] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="user_id"
                :label="`${tableColumns.user_id.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column prop="status" :label="`${tableColumns.status.name}`" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="gold"
                :label="`${tableColumns.gold.name}`"
                class-name="status-col"
                min-width="30px"
                sortable="custom"
            >
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
import BlockRechargeAddressProxy from "../proxy/BlockRechargeAddressProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class BlockRechargeAddressBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: BlockRechargeAddressProxy = this.getProxy(BlockRechargeAddressProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
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

    // private handleEdit(data: any) {
    //     this.myProxy.showDialog(DialogStatus.update, data);
    // }

    // private handlerDelete(data: any) {
    //     this.myProxy.onDelete(data.id);
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
