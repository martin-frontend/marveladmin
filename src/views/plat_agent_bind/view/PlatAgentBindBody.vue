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
            <el-table-column :label="$t('common.platMsg')" min-width="180px">
                <template slot-scope="{ row }">
                    <div>{{ $t("common.plat") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    <div>{{ $t("common.channelId") }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.userMsg')" prop="user_id" min-width="120px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ $t("common.id") }}：{{ row.user_id }}
                    </div>
                    <div>{{ $t("common.nickName") }}：{{ row.nick_name }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns.binded_at.name"
                prop="binded_at"
                min-width="160px"
                align="center"
            ></el-table-column>
            <el-table-column
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
            ></el-table-column>
            <el-table-column
                :label="tableColumns.directly_users.name"
                prop="directly_users"
                width="110px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.group_users.name"
                align="center"
                prop="group_users"
                width="110px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_awaiting_num.name"
                prop="commission_awaiting_num"
                width="120px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns.commission_received_num.name"
                prop="commission_received_num"
                width="120px"
                align="center"
            ></el-table-column>

            <el-table-column
                align="left"
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
            <el-table-column :label="$t('common.operating')" :min-width="width" align="center">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handlerPromotionFloor(row)">
                        {{ $t("plat_agent_bind.guaranteedSetting") }}
                    </el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handlerBind(row)"
                        v-if="checkUnique(unique.plat_agent_bind)"
                    >
                        {{ $t("plat_agent_bind.btnBind") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "../proxy/PlatAgentBindProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";
import { MessageBox } from "element-ui";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatAgentBindBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;
    private agentBonusData = this.myProxy.agentBonusDialogData.form;

    get show_is_agent_bonus() {
        return this.myProxy.tableData.extra_info.show_is_agent_bonus;
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handlerPromotionFloor(row: any) {
        this.myProxy.promotionFloorDialogData.user_id = row.user_id;
        this.myProxy.showSettingDialog(DialogStatus.create);
    }

    private handlerBind(row: any) {
        this.myProxy.showBindDialog(row);
    }

    private onSwitchAgentBonus(row: any) {
        if (row.is_agent_bonus == 98) {
            MessageBox.confirm("该操作会清空所有直属分红比例，确认关闭总代分红吗？")
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

    private updateAgentBonus(row: any) {
        this.myProxy.agentBonusDialogData.form.user_id = row.user_id;
        this.myProxy.agentBonusDialogData.form.is_agent_bonus = row.is_agent_bonus;
        this.myProxy.updateAgentBonus();
    }

    // 分红比例弹窗
    private showAgentBonusDialog(row: any) {
        this.myProxy.agentBonusDialogData.form.user_id = row.user_id;
        this.myProxy.agentBonusDialogData.form.agent_bonus_rate = row.agent_bonus_rate;
        this.myProxy.agentBonusDialogData.bShow = true;
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowUserDetail(user_id);
    }

    get width() {
        let _w: string = "200px";
        if (Cookies.get("language") === "vi") {
            _w = "220px";
        }
        return _w;
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
