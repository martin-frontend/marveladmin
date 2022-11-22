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
            <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" width="60px">
            </el-table-column>
            <el-table-column prop="name" :label="`${tableColumns.name.name}`" class-name="status-col" min-width="30px">
            </el-table-column>
            <el-table-column
                prop="main_coin_name"
                :label="`${tableColumns.main_coin_name.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="name_unique"
                :label="`${tableColumns.name_unique.name}`"
                class-name="status-col"
                width="80px"
            >
            </el-table-column>
            <el-table-column
                prop="rpc_url"
                :label="`${tableColumns.rpc_url.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="scan_url"
                :label="`${tableColumns.scan_url.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="chain_id"
                :label="`${tableColumns.chain_id.name}`"
                class-name="status-col"
                width="60px"
            >
            </el-table-column>
            <el-table-column prop="gas" :label="`${tableColumns.gas.name}`" class-name="status-col" min-width="30px">
            </el-table-column>
            <el-table-column
                prop="gas_price"
                :label="`${tableColumns.gas_price.name}`"
                class-name="status-col"
                min-width="30px"
            >
            </el-table-column>
            <el-table-column
                prop="block_confirm_number"
                :label="`${tableColumns.block_confirm_number.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="scan_token_url"
                :label="`${tableColumns.scan_token_url.name}`"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column prop="type" :label="`${tableColumns.status.name}`" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import BlockNetworkProxy from "../proxy/BlockNetworkProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class BlockNetworkBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockNetworkProxy = this.getProxy(BlockNetworkProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
