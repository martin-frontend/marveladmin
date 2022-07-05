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
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" width="60px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.name.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.vendor_name.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ row.vendor_name }}
                </template>
            </el-table-column>

            <el-table-column :label="$t('common.operating')" class-name="status-col" width="150px">
                <template slot-scope="{ row }">
                    <el-button type="primary" size="mini" @click="handleSetting(row)">
                        兑换参数设置
                    </el-button>
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
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class ExchangeChannelMethodBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.methodTableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerQuery() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
    // 兑换参数设置
    handleSetting(row: any) {
        Object.assign(this.myProxy.dialogDataChannelData.row, row);
        this.myProxy.methodQuery.exchange_channel_id = row.exchange_channel_id;
        this.myProxy.api_admin_exchange_channel_method_index();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
