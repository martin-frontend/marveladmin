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
                prop="plat_id"
                :label="`${tableColumns.plat_id.name}`"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="order_no"
                :label="`${tableColumns.order_no.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="user_id"
                :label="`${tableColumns.user_id.name}`"
                class-name="status-col"
                width="90px"
            >
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="from_address"
                :label="`${tableColumns.from_address.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="to_address"
                :label="`${tableColumns.to_address.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="token_name"
                :label="`${tableColumns.token_name.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column prop="amount" :label="`${tableColumns.amount.name}`" class-name="status-col" width="100px">
            </el-table-column>
            <el-table-column
                prop="txn_hash"
                :label="`${tableColumns.txn_hash.name}`"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    <a :href="row.scan_url" target="_blank" style="text-decoration: underline;">{{ row.txn_hash }}</a>
                </template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                :label="`${tableColumns.created_at.name}`"
                class-name="status-col"
                min-width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="block_number"
                :label="`${tableColumns.block_number.name}`"
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
                prop="status"
                :label="`${tableColumns.status.name}`"
                class-name="status-col"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
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
import BlockTransferInOrderProxy from "../proxy/BlockTransferInOrderProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";

@Component({
    components: {
        Pagination,
    },
})
export default class BlockTransferInOrderBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: BlockTransferInOrderProxy = this.getProxy(BlockTransferInOrderProxy);
    private userProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
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
        this.userProxy.onShowDetail(user_id);
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
