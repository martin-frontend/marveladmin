<template>
    <div>
        <el-table border :data="[{}]" style="width: 100%" v-loading="net_status.loading">
            <el-table-column prop="date" :label="LangUtil('收入')" align="right">
                <template>
                    <div align="center">
                        <p>
                            {{ tableColumns.deposit_summary.name }}
                        </p>
                        <p>
                            {{ tableColumns.plat_deposit.name }}
                            <el-tooltip effect="dark" :content="tableColumns.plat_deposit.tips" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </p>
                        <p>
                            {{ tableColumns.online_deposit.name }}
                            <el-tooltip effect="dark" :content="tableColumns.online_deposit.tips" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </p>
                        <p>
                            {{ tableColumns.manual_deposit.name }}
                            <el-tooltip effect="dark" :content="tableColumns.manual_deposit.tips" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </p>
                        <p></p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="">
                <template>
                    <div align="right">
                        <p>
                            <span style="margin-right: 5px;">{{ tableData.deposit_summary }}</span>
                        </p>
                        <p>
                            {{ tableData.plat_deposit }} （{{ tableData.plat_deposit_count }}人）
                            <!-- <el-button size="mini" type="text" @click="details(scope.row)">【详情】</el-button> -->
                        </p>
                        <p>
                            {{ tableData.online_deposit }} （{{ tableData.online_deposit_count }}人）
                            <!-- <el-button size="mini" type="text" @click="details(scope.row)">【详情】</el-button> -->
                        </p>
                        <p>
                            {{ tableData.manual_deposit }} （{{ tableData.manual_deposit_count }}人）
                            <!-- <el-button size="mini" type="text" @click="details(scope.row)">【详情】</el-button> -->
                        </p>
                        <p></p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" :label="LangUtil('支出')" align="right">
                <template>
                    <div align="center">
                        <p>
                            {{ tableColumns.withdraw_summary.name }}
                        </p>
                        <p>
                            {{ tableColumns.plat_withdraw.name }}
                            <el-tooltip effect="dark" :content="tableColumns.plat_withdraw.tips" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </p>
                        <p>
                            {{ tableColumns.online_withdraw.name }}
                            <el-tooltip effect="dark" :content="tableColumns.online_withdraw.tips" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </p>
                        <p></p>
                        <p></p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="">
                <template>
                    <div align="right">
                        <p>
                            <span style="margin-right: 5px;">{{ tableData.withdraw_summary }}</span>
                        </p>
                        <p>
                            {{ tableData.plat_withdraw }} （{{ tableData.plat_withdraw_count }}人）
                            <!-- <el-button size="mini" type="text" @click="details(scope.row)">【详情】</el-button> -->
                        </p>
                        <p>
                            {{ tableData.online_withdraw }} （{{ tableData.online_withdraw_count }}人）
                            <!-- <el-button size="mini" type="text" @click="details(scope.row)">【详情】</el-button> -->
                        </p>
                        <p></p>
                        <p>
                            <span class="profit"
                                >{{ tableColumns.profit.name }}：<i>
                                    <span v-if="tableData.profit > 0" class="win_class"> +{{ tableData.profit }}</span>
                                    <span v-else-if="tableData.profit < 0" class="loss_class">
                                        {{ tableData.profit }}</span
                                    >
                                    <span v-else> {{ tableData.profit }}</span>
                                </i></span
                            >
                        </p>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="info" v-if="this.myProxy.tableData.bShowInfo">
            <ol>
                <li>
                    {{ LangUtil("平台出入款：平台出入款只是根据充值订单订与兑换订单、用户实际出款、入款 进行统计") }}
                </li>
                <li>{{ LangUtil("统计时间：可选择查询时间。查询时间最多不超过40天。") }}</li>
                <li>
                    {{ LangUtil("用户ID（直属）：根据输入的用户ID，统计该用户所有【直属下级】的出入款数据，包含自己") }}
                </li>
                <li>
                    {{ LangUtil("用户ID（团队）：根据输入的用户ID，统计该用户所有【团队下级】的出入款数据，包含自己") }}
                </li>
                <li>{{ LangUtil("用户ID：根据输入的用户ID，统计该用户的出入款数据") }}</li>
                <li>{{ LangUtil("收支盈亏：平台入款+线上入款+人工存款-平台出款-线上出款") }}</li>
            </ol>
        </div>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatFundsFlowProxy from "../proxy/StatisticPlatFundsFlowProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class StatisticPlatFundsFlowBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatFundsFlowProxy = this.getProxy(StatisticPlatFundsFlowProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.data;
    listQuery = this.myProxy.listQuery;

    @Watch("myProxy.tableData.watchNumber")
    reloadView() {
        this.$nextTick(() => {
            this.$forceUpdate();
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.win_class {
    color: green;
}
.loss_class {
    color: red;
}
::v-deep .has-gutter {
    tr {
        :nth-child(1),
        :nth-child(3) {
            border-right: 0;
        }
    }
}
::v-deep .el-table__row {
    position: relative;
    &:hover td {
        background-color: transparent !important;
    }
    .cell {
        box-sizing: border-box;
        padding: 0 !important;
        button {
            color: #606266;
        }
        p {
            border-bottom: 1px solid #dfe6ec;
            height: 30px;
            line-height: 30px;
            i {
                margin-left: 3px;
            }
            &:last-child {
                border: 0;
            }
            .profit {
                height: 30px;
                line-height: 30px;
                position: absolute;
                right: 0;
                bottom: 0;
                width: 401.5%;
                background: #fff;
                padding-right: 16px;
                i {
                    font-style: normal;
                }
            }
        }
    }
}
.info {
    position: absolute;
    left: 0;
    bottom: 0;
}
</style>
