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
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="created_at"
                :label="`${tableColumns.created_at.name}`"
                class-name="status-col"
                min-width="145px"
            >
            </el-table-column>
            <el-table-column prop="id" :label="`${tableColumns.id.name}`" class-name="status-col" min-width="60px">
            </el-table-column>
            <el-table-column :label="`${tableColumns.type.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="content"
                :label="`${tableColumns.content.name}`"
                class-name="status-col"
                min-width="120px"
            >
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    <el-button type="primary" @click="onVerify(row.operator.params.order_no)">{{
                        row.operator.description
                    }}</el-button>
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
import PlatMessageProxy from "../proxy/PlatMessageProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatMessageBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatMessageProxy = this.getProxy(PlatMessageProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private onVerify(order_no: string) {
        this.$router.push({ path: `/layout/exchange_orders`, query: { order_no: order_no } });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
