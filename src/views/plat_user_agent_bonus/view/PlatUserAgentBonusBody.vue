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
            <el-table-column :label="LangUtil('平台信息')" align="center" min-width="160">
                <template slot-scope="{ row }">
                    <div>{{ LangUtil("平台") }}：{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                    <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" align="center" min-width="180">
                <template slot-scope="{ row }">
                    <div>
                        ID：<span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                    </div>
                    <div>{{ tableColumns.nick_name.name }}：{{ row.nick_name }}</div>
                    <div>{{ tableColumns.binded_at.name }}：{{ row.binded_at }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('上级信息')" align="center" min-width="120">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.invite_user_id.name }}：{{ row.invite_user_id }}</div>
                    <div>{{ tableColumns.parent_nick_name.name }}：{{ row.parent_nick_name }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="bind_depth" :label="tableColumns.bind_depth.name" align="center"> </el-table-column>
            <el-table-column prop="group_users" :label="tableColumns.group_users.name" align="center">
            </el-table-column>
            <el-table-column prop="group_recharge_users" :label="tableColumns.group_recharge_users.name" align="center">
            </el-table-column>
            <el-table-column prop="group_all_recharge" :label="tableColumns.group_all_recharge.name" align="center">
            </el-table-column>
            <el-table-column prop="group_loss" :label="tableColumns.group_loss.name" align="center">
                <template slot="header">
                    <el-tooltip class="item" effect="dark" :content="tableColumns['group_loss'].tips" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ tableColumns["group_loss"].name }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.group_loss" />
                </template>
            </el-table-column>
            <el-table-column prop="agent_bonus_rate" :label="tableColumns.agent_bonus_rate.name" align="center">
            </el-table-column>
            <el-table-column prop="agent_bonus" :label="tableColumns.agent_bonus.name" align="center">
            </el-table-column>
            <el-table-column prop="group_all_bonus" :label="tableColumns.group_all_bonus.name" align="center">
            </el-table-column>
            <el-table-column prop="child_agent_bonus" :label="tableColumns.child_agent_bonus.name" align="center">
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <!-- <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.admin_user_delete) && row.update_btn == 1"
                        >{{LangUtil("删除")}}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.admin_user_show) && row.update_btn == 1"
                        >{{LangUtil("编辑")}}</el-button
                    >  -->
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        :disabled="
                            row.send_bonus_time != '-' &&
                                new Date(Date.parse(listQuery.settlement_date_start)).getTime() <
                                    new Date(Date.parse(row.send_bonus_time)).getTime()
                        "
                    >
                        {{ LangUtil("发放分红") }}
                    </el-button>
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
import PlatUserAgentBonusProxy from "../proxy/PlatUserAgentBonusProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import WinLossDisplay from "@/components/WinLossDisplay.vue";

@Component({
    components: {
        Pagination,
        WinLossDisplay,
    },
})
export default class PlatUserAgentBonusBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUserAgentBonusProxy = this.getProxy(PlatUserAgentBonusProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
