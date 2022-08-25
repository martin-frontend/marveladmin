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
            <el-table-column prop="id" :label="tableColumns.id.name" align="center"> </el-table-column>
            <el-table-column prop="plat_id" :label="tableColumns.plat_id.name" align="center">
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="module" :label="tableColumns.coin_name_unique.name" align="center">
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.coin_name_unique.options[row.plat_id][row.coin_name_unique] }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="amount_before" :label="tableColumns.amount_before.name" align="center">
            </el-table-column>
            <el-table-column prop="amount" :label="tableColumns.amount.name" align="center"> </el-table-column>
            <el-table-column prop="remark" :label="tableColumns.remark.name" align="center"> </el-table-column>
            <el-table-column prop="created_at" :label="tableColumns.created_at.name" align="center"> </el-table-column>
            <!-- <el-table-column :label="$t('common.operating')" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ $t("common.update") }}</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import PlatsWalletLogProxy from "../proxy/PlatsWalletLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatsWalletLogProxyBody extends AbstractView {
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatsWalletLogProxy = this.getProxy(PlatsWalletLogProxy);
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
        this.myProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
