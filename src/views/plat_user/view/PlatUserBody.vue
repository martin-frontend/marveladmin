<template>
    <div>
        <div style="margin-bottom: 8px; text-align: right">
            <el-button
                v-if="checkUnique(unique.plat_user_store_credit_user)"
                @click="handlerAddCreditUser()"
                type="primary"
                >{{ LangUtil("新增信用用户") }}</el-button
            >
        </div>
        <el-table
            @sort-change="tableSortChange"
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
            :header-cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column :label="LangUtil('平台信息')" min-width="150px">
                <template slot-scope="{ row }">
                    <div>{{ LangUtil("平台") }}：{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                    <div>{{ LangUtil("渠道") }}：{{ row.channel_id }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('用户信息')" prop="user_id" min-width="150px" sortable="custom">
                <template slot-scope="{ row }">
                    <div>
                        ID：<span @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</span>
                    </div>
                    <div>{{ LangUtil("账号") }}：{{ row.username }}</div>
                    <div>{{ LangUtil("昵称") }}：{{ row.nick_name }}</div>
                    <div>
                        {{ LangUtil("备注") }}：<span class="user_remark">{{ row.remark }}</span>
                    </div>
                    <div>VIP：{{ row.vip_level }}</div>

                    <div>
                        {{ tableColumns.is_credit_user.name }}：{{
                            tableColumns.is_credit_user.options[row.is_credit_user]
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['phone'].name"
                prop="phone"
                min-width="100px"
                class-name="status-col"
            ></el-table-column>
            <el-table-column :label="tableColumns['status'].name" min-width="60px" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-switch
                        @change="handleToggle(row.user_id, row.status, row.is_credit_user)"
                        v-model="row.status"
                        :active-value="1"
                        :inactive-value="98"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column align="left" min-width="160px">
                <template slot="header">
                    <el-tooltip effect="dark" placement="top">
                        <div>
                            <span style="margin-right: 5px">{{ LangUtil("账户") }}</span>
                            <i class="el-icon-question" style="font-size: 14px"></i>
                        </div>
                        <div slot="content">
                            {{ tableColumns["balance"].tips }}<br />
                            {{ tableColumns["gold"].name }}={{ tableColumns["gold"].tips }}<br />
                            {{ tableColumns["vendors_money"].name }}={{ tableColumns["vendors_money"].tips }}<br />
                            {{ tableColumns["safe_gold"].name }}={{ tableColumns["safe_gold"].tips }}<br />
                        </div>
                    </el-tooltip>
                </template>
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["balance"].name }}：{{ row.sum_money }}</div>
                    <div>{{ tableColumns["gold"].name }}：{{ row.plat_money }}</div>
                    <div>{{ tableColumns["vendors_money"].name }}：{{ row.vendors_money }}</div>
                    <div>{{ tableColumns["safe_gold"].name }}：{{ row.safe_gold }}</div>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_recharge'].name"
                sortable="custom"
                prop="total_recharge"
                class-name="status-col"
                min-width="110px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.total_recharge" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_exchange'].name"
                sortable="custom"
                prop="total_exchange"
                class-name="status-col"
                min-width="110px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.total_exchange" :isShowColor="false" :isShowPlus="false" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_water'].name"
                sortable="custom"
                prop="total_water"
                class-name="status-col"
                min-width="110px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay
                        :amount="row.total_water"
                        :isShowColor="false"
                        :isShowPlus="false"
                        :isShowDollar="false"
                    />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['total_win'].name"
                sortable="custom"
                prop="total_win"
                class-name="status-col"
                min-width="110px"
            >
                <template slot-scope="{ row }">
                    <WinLossDisplay :amount="row.total_win" />
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['last_login_device'].name"
                prop="last_login_device"
                class-name="status-col"
                min-width="120px"
            ></el-table-column>
            <el-table-column :label="LangUtil('登录信息')" min-width="245px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["created_at"].name }}：{{ row.created_at }}</p>
                    <p>{{ tableColumns["last_online_at"].name }}：{{ row.last_online_at }}</p>
                    <p>{{ tableColumns["register_ip"].name }}：{{ row.register_ip }}</p>
                    <p>{{ tableColumns["last_login_ip"].name }}：{{ row.last_login_ip }}</p>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" :min-width="width" class-name="status-col">
                <template slot-scope="{ row }">
                    <div>
                        <el-button
                            class="item op-btn"
                            size="mini"
                            type="info1"
                            @click="showUserDetail(row.user_id)"
                            v-if="checkUnique(unique.plat_user_show)"
                        >
                            {{ LangUtil("详情") }}
                        </el-button>
                    </div>
                    <div>
                        <el-button
                            class="item op-btn"
                            size="mini"
                            type="primary"
                            @click="refreshGold(row.user_id)"
                            v-if="checkUnique(unique.plat_user_refresh)"
                        >
                            {{ LangUtil("刷新资产") }}
                        </el-button>
                    </div>
                    <div>
                        <el-button
                            class="item op-btn"
                            size="mini"
                            type="success"
                            @click="changeChannel(row)"
                        >
                            {{ LangUtil("更换渠道") }}
                        </el-button>
                    </div>
                    <!-- <div>
                        <el-button
                            class="item op-btn"
                            size="mini"
                            type="danger"
                            @click="onUpdateGold(row)"
                            v-if="checkUnique(unique.plat_user_update_user_gold)"
                        >
                            {{ LangUtil('扣款') }}
                        </el-button>
                    </div> -->
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
import PlatUserProxy from "../proxy/PlatUserProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";
import WinLossDisplay from "@/components/WinLossDisplay.vue";
import { MessageBox } from "element-ui";

@Component({
    components: {
        WinLossDisplay,
        Pagination,
    },
})
export default class PlatUserBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    get width() {
        let _w: string = "100px";
        if (Cookies.get("language") === "vi") {
            _w = "170px";
        }
        return _w;
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }
    // 刷新money
    refreshGold(user_id: number) {
        this.myProxy.onRefrushGold(user_id);
    }
    // 打开扣除余额弹窗
    public onUpdateGold(row: any) {
        this.myProxy.showDialog(row);
    }
    // 排序
    tableSortChange(column: any) {
        let order_by = {};
        if (column.order === "descending") {
            order_by = {
                [column.prop]: "DESC",
            };
        } else {
            order_by = {
                [column.prop]: "ASC",
            };
        }
        this.listQuery.page_count = 1;
        this.listQuery.order_by = JSON.stringify(order_by);
        this.myProxy.onQuery();
    }
    // 状态切换
    handleToggle(user_id: number, status: number, is_credit_user: number) {
        if (status == 98 && is_credit_user == 1) {
            MessageBox.confirm(LangUtil("您是否禁用此帐号，如果禁用，该用户所有下级都禁用"), LangUtil("提示"), {
                confirmButtonText: LangUtil("确定"),
                cancelButtonText: LangUtil("取消"),
                type: "warning",
                center: true,
            })
                .then(() => {
                    this.myProxy.onToggleStatus(user_id, status);
                })
                .catch(() => {
                    this.myProxy.onQuery();
                });
        } else {
            this.myProxy.onToggleStatus(user_id, status);
        }
    }

    handlerAddCreditUser() {
        this.myProxy.showCreditUserDialog();
    }

    changeChannel(data: any) {
        this.myProxy.showChangeChannelDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
