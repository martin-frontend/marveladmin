<template>
    <div>
        <div class="multi_btn">
            <el-button
                type="primary"
                size="mini"
                @click="multiType == 'rewards' ? multiSendAward() : multiCancelAward()"
                style="margin-right: 10px; margin-bottom: 5px"
                >{{ multiType == "rewards" ? LangUtil("批量派奖") : LangUtil("批量取消") }}</el-button
            >

            <el-radio-group v-model="multiType" @change="clearSelection">
                <el-radio label="rewards">{{ LangUtil("派奖") }}</el-radio>
                <el-radio label="cancel">{{ LangUtil("取消") }}</el-radio>
            </el-radio-group>
            <div>
                <div class="title">
                    {{ tableColumns.award_num.name }}
                </div>
                <el-table
                    :data="myProxy.tableData.cur_summary.award_num"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    size="mini"
                    :span-method="objectSpanMethod"
                >
                    <el-table-column :label="tableColumns.award_num.name">{{ tableColumns.award_num.name }} </el-table-column>
                    <el-table-column
                        v-for="(item, index) in myProxy.tableData.cur_summary.award_num"
                        :key="index"
                        :label="item.coin_name_unique"
                    >
                        {{ item.value }}
                    </el-table-column>
                </el-table>
                <div class="title">
                    {{ tableColumns.award_yes_num.name }}
                </div>
                <el-table
                    :data="myProxy.tableData.cur_summary.award_yes_num"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    size="mini"
                    :span-method="objectSpanMethod"
                >
                    <el-table-column :label="tableColumns.award_yes_num.name"
                        >{{ tableColumns.award_yes_num.name }}
                    </el-table-column>
                    <el-table-column
                        v-for="(item, index) in myProxy.tableData.cur_summary.award_yes_num"
                        :key="index"
                        :label="item.coin_name_unique"
                    >
                        {{ item.value }}
                    </el-table-column>
                </el-table>
                <div class="title">
                </div>

                <!-- <span>{{ tableColumns.award_num.name }}：{{ myProxy.tableData.summary.award_num }},</span>
                <span>{{ tableColumns.award_yes_num.name }}：{{ myProxy.tableData.summary.award_yes_num }}</span> -->
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
            <el-table-column :label="LangUtil('操作')" min-width="300px">
                <template slot-scope="{ row }">
                    <el-button-group>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(row)"
                            v-if="checkUnique(unique.plat_activity_award_show)"
                        >
                            {{ LangUtil("详情") }}
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="row.award_status == 11 && checkUnique(unique.plat_activity_award_send)"
                            @click="handlerSendAward(row)"
                        >
                            {{ LangUtil("派发奖励") }}
                        </el-button>
                        <el-button
                            size="mini"
                            type="primary"
                            v-if="row.award_status == 11"
                            @click="handlerCancelAward(row)"
                        >
                            {{ LangUtil("取消派奖") }}
                        </el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityAwardProxy = this.getProxy(PlatActivityAwardProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    multiType: MultiType = "rewards";

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handleSelectionChange(val: any) {
        this.myProxy.tableData.multipleSelection.length = 0;
        Object.assign(this.myProxy.tableData.multipleSelection, val);
    }
    objectSpanMethod({ row, column, rowIndex, columnIndex }: { [key: string]: number }) {
        if (rowIndex === 0) {
            if (columnIndex === 0) {
                return {
                    rowspan: 1, //合并的行数
                    colspan: 1, //合并的列数，设为0则直接不显示
                };
            }
        } else {
            return {
                rowspan: 0, //合并的行数
                colspan: 0, //合并的列数，设为0则直接不显示
            };
        }
    }

    /**检查是否可勾选 */
    checkSelectable(row: any, index: any) {
        return row.award_status == 11;
    }
    /**显示用户详情 */
    showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }
    /**批量派奖 */
    multiSendAward() {
        if (this.myProxy.tableData.multipleSelection.length === 0) {
            this.$message(this.LangUtil("请勾选玩家派奖"));
            return;
        }
        this.$confirm(this.LangUtil("是否给当前勾选玩家进行派奖?"), this.LangUtil("提示"), {
            confirmButtonText: this.LangUtil("确定"),
            cancelButtonText: this.LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                const ids = this.myProxy.tableData.multipleSelection.map((item: any) => item.id);
                this.myProxy.onSendAward({ ids: JSON.stringify(ids) });
            })
            .catch(() => {});
    }
    /**单次派奖 */
    handlerSendAward(data: any) {
        this.$confirm(this.LangUtil("是否给该玩家派奖?"), this.LangUtil("提示"), {
            confirmButtonText: this.LangUtil("确定"),
            cancelButtonText: this.LangUtil("取消"),
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
            this.$message(this.LangUtil("请勾选玩家取消派奖"));
            return;
        }
        this.$confirm(this.LangUtil("是否给当前勾选玩家取消派奖?"), this.LangUtil("提示"), {
            confirmButtonText: this.LangUtil("确定"),
            cancelButtonText: this.LangUtil("取消"),
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
        this.$confirm(this.LangUtil("是否取消派奖?"), this.LangUtil("提示"), {
            confirmButtonText: this.LangUtil("确定"),
            cancelButtonText: this.LangUtil("取消"),
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
.title{
    margin: 10px 0;
}
</style>
