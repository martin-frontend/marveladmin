<template>
    <el-dialog :title="title" :visible.sync="bonusUserLogDialogData.bShow" width="900px">
        <el-table
            @sort-change="tableSortChange"
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
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                sortable="custom"
                :label="tableColumns['stake_amount'].name"
                prop="stake_amount"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['stake_ratio'].name"
                prop="stake_ratio"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['bonus_amount'].name"
                prop="bonus_amount"
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
import PlatStakeProxy from "../../../proxy/PlatStakeProxy";
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
    private tableColumns = this.myProxy.stakeBonusUserLogtableData.columns;
    private tableData = this.myProxy.stakeBonusUserLogtableData.list;
    private listQuery = this.myProxy.stakeBonusUserLogtableData.listQuery;
    private pageInfo = this.myProxy.stakeBonusUserLogtableData.pageInfo;
    get bonusUserLogDialogData() {
        return this.myProxy.stakeBonusUserLogtableData.dialogData;
    }

    private title = "分红详情";

    get rules() {
        return {};
    }
    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onStakeBonusUserLogQuery();
    }

    // 排序
    private tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
        } else {
            order_by = {
                [column.prop]: "ASC",
            };
        }

        this.listQuery.page_count = 1;
        this.myProxy.onStakeBonusUserLogQuery(order_by);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
