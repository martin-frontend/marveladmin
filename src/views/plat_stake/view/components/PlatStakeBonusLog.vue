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
            <el-table-column :label="tableColumns['plat_id'].name" min-width="80px" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template></el-table-column
            >
            <el-table-column :label="tableColumns['date'].name" prop="date" min-width="80px" class-name="status-col">
            </el-table-column>
            <el-table-column
                :label="tableColumns['bonus_pool_amount'].name"
                prop="bonus_pool_amount"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['put_out_ratio'].name"
                prop="put_out_ratio"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_bonus_amount'].name"
                prop="total_bonus_amount"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_stake_amount'].name"
                prop="total_stake_amount"
                min-width="60px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['stake_count'].name"
                prop="stake_count"
                min-width="50px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['hundred_bonus'].name"
                prop="hundred_bonus"
                min-width="80px"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handlerDetail(row)"
                        v-if="checkUnique(unique.admin_user_show)"
                        >{{ $t("common.detail") }}</el-button
                    >
                </template>
            </el-table-column>
            -->
        </el-table>
        <PlatBonusUserLogDialog v-if="dialogData.bShow" />
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang='ts'>
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatStakeProxy from "../../proxy/PlatStakeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import PlatBonusUserLogDialog from "./dialog/PlatBonusUserLogDialog.vue";

@Component({
    components: {
        PlatBonusUserLogDialog,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "info",
                2: "success",
                3: "success",
                4: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatStakeBonusLog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    private tableColumns = this.myProxy.stakeBonustableData.columns;
    private tableData = this.myProxy.stakeBonustableData.list;
    private pageInfo = this.myProxy.stakeBonustableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    private dialogData = this.myProxy.stakeBonusUserLogtableData.dialogData;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onStakeBonusQuery();
    }
    private handlerDetail(data: any) {
        this.myProxy.showBonusUserLogDialog({ plat_id: data.plat_id, date: data.date });
    }
}
</script>
<style scoped lang='scss'>
@import "@/styles/common.scss";
</style>