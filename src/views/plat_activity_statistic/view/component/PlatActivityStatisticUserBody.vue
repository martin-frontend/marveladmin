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
            :header-cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column :label="myProxy.tableData.columns.plat_id.name" min-width="180px" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.user_id.name" min-width="130px" prop="user_id" align="center">
            </el-table-column>
            <el-table-column :label="tableColumns.receive_award_amount.name" min-width="130px" prop="receive_award_amount" align="center">
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.receive_award_amount"
                        :isShowColor="false"
                        :isShowPlus="false"
                    />
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
import PlatActivityStatisticProxy from "../../proxy/PlatActivityStatisticProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class PlatActivityStatisticUserBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityStatisticProxy = this.getProxy(PlatActivityStatisticProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.dialogData.list;
    pageInfo = this.myProxy.dialogData.pageInfo;
    listQuery = this.myProxy.dialogData.query;
    LangUtil = LangUtil;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onUserQuery();
    }

    // handleEdit(data: any) {
    //     this.myProxy.showDialog(DialogStatus.update, data);
    // }

    handlerDetail() {
        this.$router.push("/layout/plat_activity_award");
    }

    handlerPlayers(data: any) {
        this.myProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
