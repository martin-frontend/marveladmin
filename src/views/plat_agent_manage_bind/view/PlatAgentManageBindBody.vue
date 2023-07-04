<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column :label="LangUtil('平台信息')" min-width="180px">
                <template slot-scope="{ row }">
                    <div>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" prop="user_id" min-width="220px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ LangUtil("ID") }}：{{ row.user_id }}
                    </div>
                    <div>{{ LangUtil("昵称") }}：{{ row.nick_name }}</div>
                    <div>{{ tableColumns.binded_at.name }}：{{ row.binded_at }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.user_remark.name" prop="remark" min-width="100px" align="center"
                ><template slot-scope="{ row }">
                    <p>{{ row.user_remark }}</p>
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="handerEditRemark(row, 'user')"
                    ></el-button>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('上级用户信息')" min-width="180px" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.invite_user_id.name }}：{{ row.invite_user_id }}</div>
                    <div>{{ tableColumns.parent_nick_name.name }}：{{ row.parent_nick_name }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.remark.name" prop="remark" min-width="100px" align="center"
                ><template slot-scope="{ row }">
                    <p>{{ row.remark }}</p>
                    <el-button
                        type="primary"
                        size="mini"
                        icon="el-icon-edit"
                        @click="handerEditRemark(row, 'agent')"
                    ></el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column
                :label="tableColumns.invite_user_id.name"
                prop="invite_user_id"
                min-width="100px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.parent_nick_name.name"
                prop="parent_nick_name"
                min-width="110px"
                align="center"
            ></el-table-column> -->
            <el-table-column
                :label="tableColumns.bind_depth.name"
                prop="bind_depth"
                width="110px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="LangUtil('团队人数')"
                align="center"
                prop="total_group_all_users"
                width="110px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.group_all_recharge.name"
                align="center"
                prop="group_all_recharge"
                width="110px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_recharge.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_recharge" :key="key">
                            {{ key }} :
                            <WinLossDisplay
                                :isShowDollar="false"
                                :amount="value"
                                :isShowColor="false"
                                :isShowPlus="false"
                            ></WinLossDisplay>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.group_all_exchange.name"
                align="center"
                prop="group_all_exchange"
                width="110px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_exchange.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_exchange" :key="key">
                            {{ key }} :
                            <WinLossDisplay
                                :isShowDollar="false"
                                :amount="value"
                                :isShowColor="false"
                                :isShowPlus="false"
                            ></WinLossDisplay>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.group_all_total_water.name"
                align="center"
                prop="group_all_total_water"
                width="110px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_total_water.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_total_water" :key="key">
                            {{ key }} :
                            <WinLossDisplay
                                :amount="value"
                                :isShowDollar="false"
                                :isShowColor="false"
                                :isShowPlus="false"
                            ></WinLossDisplay>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <!-- 团队投注笔数 -->
            <el-table-column
                :label="tableColumns.group_all_bet_count.name"
                align="center"
                prop="group_all_bet_count"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_bet_count.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_bet_count" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 团队投注金额 -->
            <el-table-column :label="tableColumns.group_all_bet.name" align="center" prop="group_all_bet" width="150px">
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_bet.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_bet" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 团队游戏输赢金额 -->
            <el-table-column
                :label="tableColumns.group_all_win_gold.name"
                align="center"
                prop="group_all_win_gold"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_win_gold.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_win_gold" :key="key">
                            {{ key }} : <WinLossDisplay :amount="value" :isShowDollar="false" />
                        </p>
                    </div>
                </template>
            </el-table-column>
            <!-- 团队有效投注金额 -->
            <el-table-column
                :label="tableColumns.group_all_valid_bet.name"
                align="center"
                prop="group_all_valid_bet"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.group_all_valid_bet.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.group_all_valid_bet" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.directly_users.name"
                prop="directly_users"
                width="110px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.directly_users.name"
                prop="directly_users"
                width="110px"
                align="center"
            ></el-table-column>
            <!-- 直属充值 -->
            <el-table-column
                :label="tableColumns.directly_recharge.name"
                align="center"
                prop="directly_recharge"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.directly_recharge.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_recharge" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 直属兑换 -->
            <el-table-column
                :label="tableColumns.directly_exchange.name"
                align="center"
                prop="directly_exchange"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.directly_exchange.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_exchange" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 直属流水 -->
            <el-table-column
                :label="tableColumns.directly_total_water.name"
                align="center"
                prop="directly_total_water"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.directly_total_water.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_total_water" :key="key">
                            {{ key }} :
                            <WinLossDisplay :amount="value" :isShowColor="false" :isShowPlus="false"></WinLossDisplay>
                        </p>
                    </div>
                </template>
            </el-table-column>
            <!-- 直属投注笔数 -->
            <el-table-column
                :label="tableColumns.directly_bet_count.name"
                align="center"
                prop="directly_bet_count"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.directly_bet_count.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_bet_count" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 直属投注额 -->
            <el-table-column :label="tableColumns.directly_bet.name" align="center" prop="directly_bet" width="150px">
                <template slot-scope="{ row }">
                    <div v-if="row.directly_bet.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_bet" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 直属游戏输赢 -->
            <el-table-column
                :label="tableColumns.directly_win_gold.name"
                align="center"
                prop="directly_win_gold"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.directly_win_gold.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_win_gold" :key="key">
                            {{ key }} : <WinLossDisplay :amount="value" :isShowDollar="false" />
                        </p>
                    </div>
                </template>
            </el-table-column>
            <!-- 直属有效投注 -->
            <el-table-column
                :label="tableColumns.directly_valid_bet.name"
                align="center"
                prop="directly_valid_bet"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <div v-if="row.directly_valid_bet.length == 0">
                        -
                    </div>
                    <div v-else>
                        <p v-for="(value, key) of row.directly_valid_bet" :key="key">{{ key }} : {{ value }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- 当前可领取佣金 -->
            <el-table-column
                :label="tableColumns.commission_awaiting_num.name"
                prop="commission_awaiting_num"
                width="120px"
                align="left"
            >
                <template slot-scope="{ row }">
                    <div v-html="formatObject(row.commission_awaiting_num)"></div>
                </template>
            </el-table-column>
            <!-- 已领取佣金总额 -->
            <el-table-column
                :label="tableColumns.commission_received_num.name"
                prop="commission_received_num"
                width="120px"
                align="left"
            >
                <template slot-scope="{ row }">
                    <div v-html="formatObject(row.commission_received_num)"></div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.commission_total.name"
                prop="commission_total"
                width="120px"
                align="left"
            >
                <template slot-scope="{ row }">
                    <div v-html="formatObject(row.commission_total)"></div>
                </template>
            </el-table-column>
            <el-table-column align="center" width="120px" :label="tableColumns.bonus_ratio.name" prop="bonus_ratio">
            </el-table-column>
            <el-table-column
                align="left"
                :label="tableColumns.promotion_floor.name"
                prop="promotion_floor"
                width="200px"
            >
            </el-table-column>
            <!-- <el-table-column v-if="show_is_agent_bonus" :label="tableColumns.is_agent_bonus.name" width="150px">
                <template slot-scope="scope">
                    <div class="agent_bonus" v-if="scope.row.agent_bonus_status != 0">
                        <el-switch
                            v-if="scope.row.agent_bonus_status == 1"
                            v-model="scope.row.is_agent_bonus"
                            :active-value="1"
                            :inactive-value="98"
                            @change="onSwitchAgentBonus(scope.row)"
                        ></el-switch>
                        <template v-if="scope.row.agent_bonus_status == 2">
                            <el-button size="mini" type="primary" @click="showAgentBonusDialog(scope.row)">
                                {{ scope.row.agent_bonus_rate }}
                            </el-button>
                        </template>
                    </div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column :label="LangUtil('操作')" :min-width="width" align="center">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.plat_agent_bonus_config_show)"
                        size="mini"
                        type="primary"
                        @click="showBonusConifgDialog(row)"
                    >
                        {{ LangUtil("分红统计") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handlerPromotionFloor(row)">
                        {{ LangUtil("保底设定") }}
                    </el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handlerBind(row)"
                        v-if="checkUnique(unique.plat_agent_bind)"
                    >
                        {{ LangUtil("绑定") }}
                    </el-button>
                </template>
            </el-table-column> -->
            <el-table-column :label="LangUtil('操作')" :min-width="width" align="center">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="onClickDetail(row)">
                        {{ LangUtil("详情跳转") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentManageBindProxy from "../proxy/PlatAgentManageBindProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import router from "@/router";
import ChannelStatisticUserPromotionDaysIndexProxy from "@/views/channel_statistic_user_promotion_days_index/proxy/ChannelStatisticUserPromotionDaysIndexProxy";
@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class PlatAgentManageBindBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentManageBindProxy = this.getProxy(PlatAgentManageBindProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }

    get width() {
        let _w: string = "300px";
        if (Cookies.get("language") === "vi") {
            _w = "320px";
        }
        return _w;
    }

    /**编辑备注 */
    handerEditRemark(row: any, type: string) {
        console.warn("type", type);

        this.myProxy.remarkDialogData.status = DialogStatus.update;
        Object.assign(this.myProxy.remarkDialogData.form, {
            user_id: row.user_id,
            remark: type == "agent" ? row.remark : row.user_remark,
            type,
        });
        this.myProxy.showRemarkDialog();
    }

    /**物件解析 */
    formatObject(obj: any) {
        let result = "";
        Object.keys(obj).forEach((key: any) => {
            result += `<div>${key}: ${obj[key].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>`;
        });
        return result;
    }
    onClickDetail(info: any) {
        console.log("当前显示的详情", info);
        //Vue.router.push("/plat_agent_manage_bind");
        router.push("/layout/channel_statistic_user_promotion_days_index");

        const channel_Proxy: ChannelStatisticUserPromotionDaysIndexProxy = this.getProxy(
            ChannelStatisticUserPromotionDaysIndexProxy
        );
        //if (checkUnique(unique.dashboard)) router.replace("/layout/dashboard");
        channel_Proxy.listQuery.plat_id = this.listQuery.plat_id;
        channel_Proxy.listQuery.user_id = info.user_id;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
