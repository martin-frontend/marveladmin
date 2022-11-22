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
            <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" min-width="30px">
            </el-table-column>
            <el-table-column
                prop="coin_name_unique"
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.coin_name_unique.options[row.coin_name_unique] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="contract_name"
                :label="`${tableColumns.contract_name.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                :label="`${tableColumns.remark.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="block_network_id"
                :label="`${tableColumns.block_network_id.name}`"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.block_network_id.options[row.block_network_id] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="contract_address"
                :label="`${tableColumns.contract_address.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column prop="type" :label="`${tableColumns.type.name}`" class-name="status-col" min-width="90px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="contract_decimal"
                :label="`${tableColumns.contract_decimal.name}`"
                class-name="status-col"
                min-width="90px"
            >
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
import BlockContractProxy from "../proxy/BlockContractProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class BlockContractBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: BlockContractProxy = this.getProxy(BlockContractProxy);
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
