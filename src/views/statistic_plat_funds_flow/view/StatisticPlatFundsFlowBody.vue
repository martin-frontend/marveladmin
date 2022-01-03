<template>
    <div>
        <el-table border :data="[{}]" style="width: 100%" v-loading="net_status.loading">
            <el-table-column prop="date" :label="$t('statistic_plat_funds_flow.income')" align="right">
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
            <el-table-column prop="date" :label="$t('statistic_plat_funds_flow.expenditure')" align="right">
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
                <li>{{ $t("statistic_plat_funds_flow.infoText1") }}</li>
                <li>{{ $t("statistic_plat_funds_flow.infoText2") }}</li>
                <li>{{ $t("statistic_plat_funds_flow.infoText3") }}</li>
                <li>{{ $t("statistic_plat_funds_flow.infoText4") }}</li>
                <li>{{ $t("statistic_plat_funds_flow.infoText5") }}</li>
                <li>{{ $t("statistic_plat_funds_flow.infoText6") }}</li>
            </ol>
        </div>
    </div>
</template>
<script lang="ts">
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
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: StatisticPlatFundsFlowProxy = this.getProxy(StatisticPlatFundsFlowProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.data;
    private listQuery = this.myProxy.listQuery;

    @Watch("myProxy.tableData.watchNumber")
    private reloadView() {
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
