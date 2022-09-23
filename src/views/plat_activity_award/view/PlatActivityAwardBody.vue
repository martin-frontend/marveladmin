<template>
    <div>
        <div class="multi_btn">
            <el-button
                type="primary"
                size="mini"
                @click="multiType == 'rewards' ? multiSendAward() : multiCancelAward()"
                style="margin-right: 10px; margin-bottom: 5px"
                >{{
                    multiType == "rewards"
                        ? $t("plat_activity_award.batchAward")
                        : $t("plat_activity_award.batchCancel")
                }}</el-button
            >

            <el-radio-group v-model="multiType" @change="clearSelection">
                <el-radio label="rewards">{{ $t("plat_activity_award.award") }}</el-radio>
                <el-radio label="cancel">{{ $t("common.cancel") }}</el-radio>
            </el-radio-group>
            <div>
                <span>{{ tableColumns.award_num.name }}：{{ myProxy.tableData.summary.award_num }},</span>
                <span>{{ tableColumns.award_yes_num.name }}：{{ myProxy.tableData.summary.award_yes_num }}</span>
            </div>
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            @selection-change="handleSelectionChange"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            ref="multipleTable"
        >
            <el-table-column type="selection" :selectable="checkSelectable" min-width="20px"> </el-table-column>
            <el-table-column :label="tableColumns['id'].name" prop="id" min-width="60px"></el-table-column>
            <el-table-column :label="tableColumns['user_id'].name" prop="user_id" min-width="85">
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">{{
                        row.user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['activity_id'].name"
                prop="activity_id"
                min-width="60"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['child_rule_num'].name"
                prop="child_rule_num"
                min-width="85"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['activity_name'].name"
                prop="activity_name"
                min-width="80"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['award_content'].name"
                prop="award_content"
                min-width="85"
            ></el-table-column>
            <el-table-column :label="tableColumns['settlement_type'].name" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns["settlement_type"].options[row.settlement_type] || "-" }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['settlement_time_at'].name"
                prop="settlement_time_at"
                min-width="90"
            ></el-table-column>
            <el-table-column :label="tableColumns['award_type'].name" prop="award_type" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns["award_type"].options[row.award_type] }}
                </template></el-table-column
            >
            <el-table-column
                :label="tableColumns['award_timing_at'].name"
                prop="award_timing_at"
                min-width="95"
            ></el-table-column>
            <el-table-column :label="tableColumns['award_status'].name" min-width="95px">
                <template slot-scope="{ row }">
                    {{ tableColumns["award_status"].options[row.award_status] || "-" }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['plat_id'].name" min-width="120">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" min-width="300px">
                <template slot-scope="{ row }">
                    <el-button-group>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(row)"
                            v-if="checkUnique(unique.plat_activity_award_show)"
                        >
                            {{ $t("common.detail") }}
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="row.award_status == 11 && checkUnique(unique.plat_activity_award_send)"
                            @click="handlerSendAward(row)"
                        >
                            {{ $t("plat_activity_award.rewards") }}
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="row.award_status == 11"
                            @click="handlerCancelAward(row)"
                        >
                            {{ $t("plat_activity_award.cancelRewards") }}
                        </el-button>
                    </el-button-group>
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
import PlatActivityAwardProxy from "../proxy/PlatActivityAwardProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

type MultiType = "rewards" | "cancel";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatActivityAwardBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatActivityAwardProxy = this.getProxy(PlatActivityAwardProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    multiType: MultiType = "rewards";

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handleSelectionChange(val: any) {
        this.myProxy.tableData.multipleSelection.length = 0;
        Object.assign(this.myProxy.tableData.multipleSelection, val);
    }

    /**检查是否可勾选 */
    private checkSelectable(row: any, index: any) {
        return row.award_status == 11;
    }
    /**显示用户详情 */
    private showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }
    /**批量派奖 */
    private multiSendAward() {
        if (this.myProxy.tableData.multipleSelection.length === 0) {
            this.$message(this.$t("plat_activity_award.confirmError"));
            return;
        }
        this.$confirm(this.$t("plat_activity_award.batchConfirm"), this.$t("common.prompt"), {
            confirmButtonText: this.$t("common.determine"),
            cancelButtonText: this.$t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                const ids = this.myProxy.tableData.multipleSelection.map((item: any) => item.id);
                this.myProxy.onSendAward({ ids: JSON.stringify(ids) });
            })
            .catch(() => {});
    }
    /**单次派奖 */
    private handlerSendAward(data: any) {
        this.$confirm(this.$t("plat_activity_award.confirmOnce"), this.$t("common.prompt"), {
            confirmButtonText: this.$t("common.determine"),
            cancelButtonText: this.$t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onSendAward({ ids: JSON.stringify([data.id]) });
            })
            .catch(() => {});
    }

    /**批量取消 */
    multiCancelAward() {
        if (this.myProxy.tableData.multipleSelection.length === 0) {
            this.$message(this.$t("plat_activity_award.confirmError1"));
            return;
        }
        this.$confirm(this.$t("plat_activity_award.batchConfirm1"), this.$t("common.prompt"), {
            confirmButtonText: this.$t("common.determine"),
            cancelButtonText: this.$t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                const ids = this.myProxy.tableData.multipleSelection.map((item: any) => item.id);
                this.myProxy.onCancelAward({ ids: JSON.stringify(ids) });
                this.clearSelection();
            })
            .catch(() => {});
    }

    /**单次取消派獎 */
    handlerCancelAward(data: any) {
        this.$confirm(this.$t("plat_activity_award.confirmOnce1"), this.$t("common.prompt"), {
            confirmButtonText: this.$t("common.determine"),
            cancelButtonText: this.$t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onCancelAward({ ids: JSON.stringify([data.id]) });
                this.clearSelection();
            })
            .catch(() => {});
    }

    clearSelection() {
        this.myProxy.tableData.multipleSelection.length = 0;
        this.$refs.multipleTable.clearSelection();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.multi_btn {
    margin-bottom: 16px;
    span {
        font-size: 14px;
        margin-left: 16px;
    }
}
</style>
