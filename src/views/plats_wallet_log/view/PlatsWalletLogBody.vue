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
            <el-table-column prop="balance" :label="tableColumns.balance.name" align="center"> </el-table-column>
            <el-table-column prop="type" :label="tableColumns.type.name" align="center">
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.type.options[row.type] }}
                    </p>
                </template></el-table-column
            >
            <el-table-column prop="remark" :label="tableColumns.remark.name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        <span v-if="row.type >= 200">{{ row.remark }}</span>
                        <span v-else @click="showUserDetail(row.remark)" class="user_id">{{ row.remark }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" :label="tableColumns.created_at.name" align="center"> </el-table-column>
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
import PlatsWalletLogProxy from "../proxy/PlatsWalletLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatsWalletLogProxyBody extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatsWalletLogProxy = this.getProxy(PlatsWalletLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
    //  handleEdit(data: any) {
    //     this.myProxy.showDialog(data);
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
