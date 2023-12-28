<template>
    <el-dialog :title="LangUtil('代理直属亏损分红明细')" :visible.sync="myProxy.dialogDetailData.bShow" width="85%">
        <div class="header-content">
            <div class="group">
                <SearchInput :title="tableColumns.channel_id.name" v-model="listQuery.channel_id" />
                <SearchInput :title="tableColumns.user_id.name" v-model="listQuery.user_id" />
                <SearchSelect
                    :title="tableColumns.send_bonus_status.name"
                    v-model="listQuery.send_bonus_status"
                    :options="tableColumns.send_bonus_status.options"
                />
                <div>
                    <el-button class="header-button" @click="handlerSearch()" type="primary">
                        {{ LangUtil("查询") }}
                    </el-button>
                    <el-button class="header-button" @click="handlerReset()" type="primary">
                        {{ LangUtil("重置") }}
                    </el-button>
                </div>
            </div>
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%; margin-top: 16px;"
            size="mini"
            v-loading="net_status.loading"
            @sort-change="tableSortChange"
        >
            <el-table-column class-name="status-col" :label="tableColumns.plat_id.name" prop="plat_id">
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.channel_id.name" prop="channel_id">
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.user_id.name" prop="user_id">
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" class="user_id"> {{ row.user_id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.directly_commission_status.name"
                prop="directly_commission_status"
            >
                <template slot-scope="{ row }">
                    <el-switch
                        @change="onSwitchStatus(row)"
                        v-model="row.directly_commission_status"
                        :active-value="1"
                        :inactive-value="98"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.direct_total_win_loss.name"
                prop="direct_total_win_loss"
                min-width="120px"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    <span :class="row.direct_total_win_loss.value | winLossFilter">
                        {{ row.direct_total_win_loss.coin_name_unique }}: {{ row.direct_total_win_loss.value }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.bonus_ratio.name" prop="bonus_ratio">
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.direct_commission.name"
                prop="direct_commission"
                min-width="120px"
                sortable="custom"
            >
                <template slot-scope="{ row }">
                    {{ row.direct_commission.coin_name_unique }}: {{ row.direct_commission.value }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns.send_bonus_time.name"
                prop="send_bonus_time"
                min-width="120px"
            >
            </el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns.updated_by.name" prop="updated_by">
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleSend(row)"
                        :disabled="
                            row.send_bonus_status == 2 ||
                                row.settlement_type == 4 ||
                                row.settlement_type == 8 ||
                                row.direct_commission.value == 0
                        "
                    >
                        {{ LangUtil("发放分红") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import { DialogStatus } from "@/core/global/Constant";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import Pagination from "@/components/Pagination.vue";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import { MessageBox } from "element-ui";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        Pagination,
    },
    filters: {
        winLossFilter(value: any) {
            if (value > 0) {
                return "red-color";
            } else if (value < 0) {
                return "green-color";
            } else {
                return "";
            }
        },
    },
})
export default class StatisticPlatDirectlyCommissionDetailDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
    // proxy property
    tableColumns = this.myProxy.detailTableData.columns;
    tableData = this.myProxy.detailTableData.list;
    pageInfo = this.myProxy.detailTableData.pageInfo;
    listQuery = this.myProxy.detailListQuery;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQueryDetailTable();
    }

    handlerReset() {
        this.myProxy.resetDetailListQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQueryDetailTable();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }

    onSwitchStatus(row: any) {
        let confirmText = "";
        if (row.directly_commission_status == 98) {
            confirmText = LangUtil(
                "关闭{0}的直属亏损分红功能，{1}以及其所有下级均失去直属亏损分红的资格，请问确认要关闭吗？",
                row.user_id,
                row.user_id
            );
        } else {
            confirmText = LangUtil("确定要开启{0}的直属亏损分红功能吗？", row.user_id);
        }
        MessageBox.confirm(confirmText, LangUtil("提示"), {
            confirmButtonText: LangUtil("确定"),
            cancelButtonText: LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onUpdateSwitch({
                    user_id: row.user_id,
                    directly_commission_status: row.directly_commission_status,
                });
            })
            .catch(() => {
                this.myProxy.onQueryDetailTable();
            });
    }

    // 发放分红
    handleSend(data: any) {
        this.myProxy.showBonusDialog(DialogStatus.update, data);
    }

    // 排序
    tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
            this.listQuery.order_by = JSON.stringify(order_by);
        } else if (column.order === "ascending") {
            order_by = {
                [column.prop]: "ASC",
            };
            this.listQuery.order_by = JSON.stringify(order_by);
        } else {
            this.listQuery.order_by = null;
        }
        this.listQuery.page_count = 1;
        console.log(this.listQuery);
        this.myProxy.onQueryDetailTable();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-dialog {
    margin-top: 20px !important;
}
.green-color {
    color: green;
}
.red-color {
    color: red;
}
</style>
