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
            <el-table-column
                prop="coin_name_unique"
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
            >
            </el-table-column>

            <el-table-column prop="chain_name" :label="`${tableColumns.chain_name.name}`" class-name="status-col">
            </el-table-column>

            <el-table-column prop="total_amount" :label="`${tableColumns.total_amount.name}`" class-name="status-col">
            </el-table-column>

            <el-table-column
                prop="withdraw_able_amount"
                :label="`${tableColumns.withdraw_able_amount.name}`"
                class-name="status-col"
            >
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAssetWalletProxy from "../proxy/PlatAssetWalletProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAssetWalletBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAssetWalletProxy = this.getProxy(PlatAssetWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    // private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    get tableData() {
        return this.myProxy.tableData.list;
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
