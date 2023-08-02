<template>
    <div>
        <div class="group">
            <SearchDatePicker
                :title="LangUtil('统计日期')"
                :startDate.sync="listQuery.start_date"
                :endDate.sync="listQuery.end_date"
                :clearable="false"
            />
            <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">
                {{ LangUtil("查询") }}
            </el-button>
            <!-- <div class="content">
                <span class="title">
                    {{ LangUtil("统计开始时间") }}
                </span>
                <el-date-picker
                    type="date"
                    align="right"
                    value-format="yyyy-MM-dd"
                    :placeholder="LangUtil('请选择')"
                    :pickerOptions="myProxy.pickerOptions"
                    v-model="listQuery.start_date"
                    @change="onChangeStart"
                    :clearable="false"
                >
                </el-date-picker>
            </div>
            <div class="content">
                <span class="title">
                    {{ LangUtil("统计结束时间") }}
                </span>
                <el-date-picker
                    type="date"
                    align="right"
                    value-format="yyyy-MM-dd"
                    :placeholder="LangUtil('请选择')"
                    :pickerOptions="myProxy.pickerOptions"
                    v-model="listQuery.end_date"
                    @change="onChangeEnd"
                    :clearable="false"
                >
                </el-date-picker>
            </div> -->
        </div>
        <div style="display: flex; flex-wrap: wrap" v-loading="net_status.loading">
            <div class="stats_table">
                <div class="stats_title">
                    {{ LangUtil("玩家充值(全部订单)") }}
                </div>
                <el-table
                    :data="myProxy.total_recharge"
                    border
                    fit
                    highlight-current-row
                    :header-cell-style="{
                        'text-align': 'center',
                    }"
                    size="mini"
                >
                    <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('金额')" prop="total_recharge" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('人数')" prop="user_num" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('笔数')" prop="total_recharge_count" class-name="status-col">
                    </el-table-column>
                </el-table>
            </div>
            <div class="stats_table">
                <div class="stats_title">
                    {{ LangUtil("玩家充值(普通订单)") }}
                </div>
                <el-table
                    :data="myProxy.non_vip_recharge"
                    border
                    fit
                    highlight-current-row
                    :header-cell-style="{
                        'text-align': 'center',
                    }"
                    size="mini"
                >
                    <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('金额')" prop="non_vip_total_recharge" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('人数')" prop="non_vip_user_num" class-name="status-col">
                    </el-table-column>
                    <el-table-column
                        :label="LangUtil('笔数')"
                        prop="non_vip_total_recharge_count"
                        class-name="status-col"
                    >
                    </el-table-column>
                </el-table>
            </div>
            <div class="stats_table">
                <div class="stats_title">
                    {{ LangUtil("玩家充值(VIP订单)") }}
                </div>
                <el-table
                    :data="myProxy.vip_recharge"
                    border
                    fit
                    highlight-current-row
                    :header-cell-style="{
                        'text-align': 'center',
                    }"
                    size="mini"
                >
                    <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('金额')" prop="vip_total_recharge" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('人数')" prop="vip_user_num" class-name="status-col">
                    </el-table-column>
                    <el-table-column :label="LangUtil('笔数')" prop="vip_total_recharge_count" class-name="status-col">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-loading="net_status.loading">
            <div class="stats_title">
                {{ LangUtil("平台游戏输赢") }}
            </div>
            <el-table
                :data="myProxy.game_win_gold"
                border
                fit
                style="width: 100%"
                highlight-current-row
                :header-cell-style="{
                    'text-align': 'center',
                }"
                size="mini"
            >
                <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('棋牌')" prop="win_gold_2" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_2" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('彩票')" prop="win_gold_4" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_4" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('捕鱼')" prop="win_gold_8" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_8" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('电子')" prop="win_gold_16" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_16" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('真人')" prop="win_gold_32" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_32" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('体育电竞')" prop="win_gold_64" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_64" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('链游')" prop="win_gold_128" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_gold_128" :isShowDollar="false" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-loading="net_status.loading">
            <div class="stats_title">
                {{ LangUtil("平台币种统计") }}
            </div>
            <el-table
                :data="myProxy.plat_coin_statistic"
                border
                fit
                style="width: 100%"
                highlight-current-row
                :header-cell-style="{
                    'text-align': 'center',
                }"
                size="mini"
            >
                <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('充值')" prop="recharge_amount" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('兑换')" prop="exchange_amount" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('推广赚钱')" prop="commission_amount" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('游戏挖矿')" prop="backwater_amount" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('邮件奖励')" prop="mail_awards_amount" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('活动奖励')" prop="activity_awards_amount" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('人工扣款')" prop="manual_deduct_amount" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.manual_deduct_amount" :isShowDollar="false" />
                    </template>
                </el-table-column>
                <el-table-column :label="LangUtil('游戏输赢')" prop="win_loss_amount" class-name="status-col">
                    <template slot-scope="{ row }">
                        <WinLossDisplay :amount="row.win_loss_amount" :isShowDollar="false" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import DashboardProxy from "@/views/dashboard/proxy/DashboardProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { dateFormat } from "@/core/global/Functions";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        WinLossDisplay,
        SearchDatePicker,
    },
})
export default class DashboardDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: DashboardProxy = this.getProxy(DashboardProxy);
    listQuery = this.myProxy.listQuery;

    // onChangeStart() {
    //     if (this.listQuery.start_date) {
    //         if (this.listQuery.start_date == dateFormat(new Date(), "yyyy-MM-dd")) {
    //             // 开始时间选今天 结束时间为今天
    //             this.listQuery.end_date = this.listQuery.start_date;
    //         } else {
    //             this.listQuery.end_date = this.incrementDate(this.listQuery.start_date, 1);
    //         }
    //     }
    //     this.myProxy.onQueryStats();
    // }

    // onChangeEnd() {
    //     if (this.listQuery.end_date) {
    //         this.listQuery.start_date = this.incrementDate(this.listQuery.end_date, -1);
    //     }
    //     this.myProxy.onQueryStats();
    // }

    // incrementDate(date_str: string, incrementor: number) {
    //     var parts = date_str.split("-");
    //     var dt = new Date(
    //         parseInt(parts[0], 10), // year
    //         parseInt(parts[1], 10) - 1, // month (starts with 0)
    //         parseInt(parts[2], 10) // date
    //     );
    //     dt.setDate(dt.getDate() + incrementor);
    //     parts[0] = "" + dt.getFullYear();
    //     parts[1] = "" + (dt.getMonth() + 1);
    //     if (parts[1].length < 2) {
    //         parts[1] = "0" + parts[1];
    //     }
    //     parts[2] = "" + dt.getDate();
    //     if (parts[2].length < 2) {
    //         parts[2] = "0" + parts[2];
    //     }
    //     return parts.join("-");
    // }
    handlerSearch() {
        this.myProxy.onQueryStats();
    }
}
</script>

<style lang="scss" scoped>
.title {
    min-width: 97px;
    text-align: center;
    border-radius: 4px 0 0px 4px;
    border: 1px solid #dcdfe6;
    border-right: 0;
    font-size: 14px;
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
}
.content {
    display: inline-table;
    // width: 280px;
    margin-right: 10px;
    margin-bottom: 10px;
    el-select {
        width: 100%;
    }

    ::v-deep .el-input__inner {
        width: 100%;
        border-radius: 0px 4px 4px 0px;
    }
}
.stats_title {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
}
.stats_table {
    width: 500px;
    margin-right: 30px;
    &:last-child {
        margin-right: 0px;
    }
}
</style>
