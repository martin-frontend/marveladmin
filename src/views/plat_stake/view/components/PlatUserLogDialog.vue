<template>
    <el-dialog :title="title" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns['plat_id'].name" min-width="80px" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template></el-table-column
            >
            <el-table-column
                :label="tableColumns['user_id'].name"
                prop="user_id"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['stake_coin_name_unique'].name"
                prop="stake_coin_name_unique"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_stake_amount'].name"
                prop="total_stake_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_transfer_fee_amount'].name"
                prop="total_transfer_fee_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import PlatStakeProxy from "../../proxy/PlatStakeProxy";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUserLogDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    private tableColumns = this.myProxy.stakeUserLogTableData.columns;
    private tableData = this.myProxy.stakeUserLogTableData.list;
    private listQuery = this.myProxy.stakeUserLogTableData.listQuery;
    private pageInfo = this.myProxy.stakeUserLogTableData.pageInfo;

    private title = "质押详情";

    get rules() {
        return {};
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onStakeUserLogQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
