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
            <el-table-column :label="LangUtil('用户信息')" min-width="220px">
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
                :label="tableColumns.group_users.name"
                prop="total_group_all_users"
                width="110px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.group_all_recharge.name"
                align="center"
                prop="group_all_recharge"
                width="150px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.group_all_exchange.name"
                align="center"
                prop="group_all_exchange"
                width="150px"
            >
            </el-table-column>
            <!-- 团队流水 -->
            <el-table-column
                :label="tableColumns.group_all_total_water.name"
                align="center"
                prop="group_all_total_water"
                width="150px"
            >
            </el-table-column>
            <!-- 团队投注金额 -->
            <el-table-column :label="tableColumns.group_all_bet.name" align="center" prop="group_all_bet" width="150px">
            </el-table-column>
            <!-- 团队游戏输赢金额 -->
            <el-table-column
                :label="tableColumns.group_all_win_gold.name"
                align="center"
                prop="group_all_win_gold"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.group_all_win_gold" :isShowDollar="true" />
                </template>
            </el-table-column>
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
            </el-table-column>
            <!-- 直属兑换 -->
            <el-table-column
                :label="tableColumns.directly_exchange.name"
                align="center"
                prop="directly_exchange"
                width="150px"
            >
            </el-table-column>
            <!-- 直属流水 -->
            <el-table-column
                :label="tableColumns.directly_total_water.name"
                align="center"
                prop="directly_total_water"
                width="150px"
            >
            </el-table-column>
            <!-- 直属投注额 -->
            <el-table-column :label="tableColumns.directly_bet.name" align="center" prop="directly_bet" width="150px">
            </el-table-column>
            <!-- 直属游戏输赢 -->
            <el-table-column
                :label="tableColumns.directly_win_gold.name"
                align="center"
                prop="directly_win_gold"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.directly_win_gold" :isShowDollar="true" />
                </template>
            </el-table-column>
            <!-- 当前可领取佣金 -->
            <el-table-column
                :label="tableColumns.commission_awaiting_num.name"
                prop="commission_awaiting_num"
                width="120px"
                align="center"
            >
            </el-table-column>
            <!-- 已领取佣金总额 -->
            <el-table-column
                :label="tableColumns.commission_received_num.name"
                prop="commission_received_num"
                width="120px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns.commission_total.name"
                prop="commission_total"
                width="120px"
                align="center"
            >
            </el-table-column>

            <el-table-column align="center" :label="tableColumns.agent_bonus.name" prop="agent_bonus" width="120px">
            </el-table-column>
            <el-table-column align="center" width="120px" :label="tableColumns.bonus_ratio.name" prop="bonus_ratio">
            </el-table-column>
            <el-table-column
                align="center"
                :label="tableColumns.promotion_floor.name"
                prop="promotion_floor"
                width="200px"
            >
            </el-table-column>
            <el-table-column v-if="show_is_agent_bonus" :label="tableColumns.is_agent_bonus.name" width="150px">
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
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" :min-width="width" align="center">
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
import { Component, Vue } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "../proxy/PlatAgentBindProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";
import { MessageBox } from "element-ui";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import router from "@/router";
import StatisticUserPromotionDaysIndexProxy from "@/views/statistic_user_promotion_days_index/proxy/StatisticUserPromotionDaysIndexProxy";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class PlatAgentBindBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    agentBonusData = this.myProxy.agentBonusDialogData.form;

    get show_is_agent_bonus() {
        return this.myProxy.tableData.extra_info.show_is_agent_bonus;
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerPromotionFloor(row: any) {
        this.myProxy.promotionFloorDialogData.user_id = row.user_id;
        this.myProxy.showSettingDialog(DialogStatus.create);
    }

    handlerBind(row: any) {
        this.myProxy.showBindDialog(row);
    }

    onSwitchAgentBonus(row: any) {
        if (row.is_agent_bonus == 98) {
            const str: any = LangUtil("该操作会清空所有直属分红比例，确认关闭总代分红吗？");
            MessageBox.confirm(str)
                .then(() => {
                    this.updateAgentBonus(row);
                })
                .catch(() => {
                    row.is_agent_bonus = 1;
                });
        } else {
            this.updateAgentBonus(row);
        }
    }

    updateAgentBonus(row: any) {
        this.myProxy.agentBonusDialogData.form.user_id = row.user_id;
        this.myProxy.agentBonusDialogData.form.is_agent_bonus = row.is_agent_bonus;
        this.myProxy.updateAgentBonus();
    }

    // 分红比例弹窗
    showAgentBonusDialog(row: any) {
        this.myProxy.agentBonusDialogData.form.user_id = row.user_id;
        this.myProxy.agentBonusDialogData.form.agent_bonus_rate = row.agent_bonus_rate;
        this.myProxy.agentBonusDialogData.bShow = true;
    }

    // 分红统计弹窗
    showBonusConifgDialog(row: any) {
        this.myProxy.bonusConfigDialogData.bShow = true;
        this.myProxy.api_admin_plat_agent_bonus_config_table_columns();
        this.myProxy.api_admin_plat_agent_bonus_config_show(row.user_id);
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
        router.push("/layout/statistic_user_promotion_days_index");

        const channel_Proxy: StatisticUserPromotionDaysIndexProxy = this.getProxy(StatisticUserPromotionDaysIndexProxy);
        //if (checkUnique(unique.dashboard)) router.replace("/layout/dashboard");
        channel_Proxy.listQuery.plat_id = this.listQuery.plat_id;
        channel_Proxy.listQuery.user_id = info.user_id;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.agent_bonus {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
