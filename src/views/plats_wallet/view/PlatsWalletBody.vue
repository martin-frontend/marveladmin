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
            <el-table-column prop="amount" :label="tableColumns.amount.name" align="center"> </el-table-column>
            <!-- <el-table-column :label="LangUtil('操作')" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil('编辑') }}</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import PlatsWalletProxy from "../proxy/PlatsWalletProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatsWalletProxyBody extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatsWalletProxy = this.getProxy(PlatsWalletProxy);
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
        this.myProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
