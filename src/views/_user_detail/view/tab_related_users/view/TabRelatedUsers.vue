<template>
    <div>
        <div class="total" v-loading="net_status.loading">
            <div class="total related">
                <span
                    >{{ $t("user_detail.relatedDevice") }}：<span
                        @click="showDeviceDetail()"
                        class="user_id count"
                        :class="selected == 0 ? 'selected' : ''"
                        >{{ devicePageInfo.pageTotal }}</span
                    ></span
                >
                <span
                    >{{ $t("user_detail.relatedIp") }}：<span
                        @click="showIpDetail()"
                        class="user_id count"
                        :class="selected == 1 ? 'selected' : ''"
                        >{{ ipPageInfo.pageTotal }}</span
                    ></span
                >
                <span
                    >{{ $t("user_detail.relatedBank") }}：<span
                        @click="showBankDetail()"
                        class="user_id count"
                        :class="selected == 2 ? 'selected' : ''"
                        >{{ bankPageInfo.pageTotal }}</span
                    ></span
                >
                <span
                    >{{ $t("user_detail.relatedCoin") }}：<span
                        @click="showCoinDetail()"
                        class="user_id"
                        :class="selected == 3 ? 'selected' : ''"
                        >{{ coinPageInfo.pageTotal }}</span
                    ></span
                >
            </div>
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
            >
                <el-table-column :label="$t('common.userMsg')" prop="user_id" min-width="150px">
                    <template slot-scope="{ row }">
                        <div>
                            ID：<span @click="showUserDetail(row.user_id)" :class="isShowDetailBtn ? 'user_id' : ''">{{
                                row.user_id
                            }}</span>
                        </div>
                        <div>{{ $t("common.account") }}：{{ row.username }}</div>
                        <div>{{ $t("common.nickName") }}：{{ row.nick_name }}</div>
                        <div>
                            {{ $t("plat_agent_bind.note") }}：<span class="user_remark">{{ row.remark }}</span>
                        </div>
                        <div>VIP：{{ row.vip_level }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns['status'].name" min-width="60px" class-name="status-col">
                    <template slot-scope="{ row }">
                        <el-switch
                            @change="handleToggle(row.user_id, row.status)"
                            v-model="row.status"
                            :active-value="1"
                            :inactive-value="98"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="tableColumns['total_recharge'].name"
                    prop="total_recharge"
                    class-name="status-col"
                    min-width="110px"
                ></el-table-column>
                <el-table-column
                    :label="tableColumns['total_exchange'].name"
                    prop="total_exchange"
                    class-name="status-col"
                    min-width="110px"
                ></el-table-column>
                <el-table-column
                    :label="tableColumns['total_water'].name"
                    prop="total_water"
                    class-name="status-col"
                    min-width="110px"
                ></el-table-column>
                <el-table-column
                    :label="tableColumns['total_win'].name"
                    prop="total_win"
                    class-name="status-col"
                    min-width="110px"
                >
                    <template slot-scope="{ row }">
                        <span :style="row.total_win >= 0 ? 'color:green' : 'color:red'">{{
                            row.total_win | hasPlus
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('common.operating')" :min-width="width" class-name="status-col">
                    <template slot-scope="{ row }">
                        <div v-if="isShowDetailBtn">
                            <el-button
                                class="item op-btn"
                                size="mini"
                                type="info1"
                                @click="showUserDetail(row.user_id)"
                                v-if="checkUnique(unique.plat_user_show)"
                            >
                                {{ $t("common.detail") }}
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
                                {{ $t("plat_user.refreshCoins") }}
                            </el-button>
                        </div>
                        <div>
                            <el-button
                                class="item op-btn"
                                size="mini"
                                type="danger"
                                @click="onUpdateGold(row)"
                                v-if="checkUnique(unique.plat_user_update_user_gold)"
                            >
                                {{ $t("user_detail.deduct") }}
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <UpdateGoldDialog v-if="myProxy.dialogData.bShow" />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabRelatedUsersMediator from "../mediator/TabRelatedUsersMediator";
import TabRelatedUsersProxy from "../proxy/TabRelatedUsersProxy";
import { getPageSetting, getProxy, page1 } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";
import UpdateGoldDialog from "./UpdateGoldDialog.vue";

@Component({
    components: {
        UpdateGoldDialog,
    },
    filters: {
        hasPlus(value: number) {
            if (value >= 0) {
                return `+${value.toString()}`;
            }
            return value;
        },
    },
})
export default class TabRelatedUsers extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabRelatedUsersProxy = getProxy(TabRelatedUsersProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.devicelList;
    private devicePageInfo = this.myProxy.tableData.devicePageInfo;
    private ipPageInfo = this.myProxy.tableData.ipPageInfo;
    private bankPageInfo = this.myProxy.tableData.bankPageInfo;
    private coinPageInfo = this.myProxy.tableData.coinPageInfo;
    private selected = 0;
    constructor() {
        super(TabRelatedUsersMediator);
    }

    get width() {
        let _w: string = "100px";
        if (Cookies.get("language") === "vi") {
            _w = "170px";
        }
        return _w;
    }

    get isShowDetailBtn() {
        return getPageSetting() == page1;
    }

    showDeviceDetail() {
        this.tableData = this.myProxy.tableData.devicelList;
        this.selected = 0;
    }

    showIpDetail() {
        this.tableData = this.myProxy.tableData.iplList;
        this.selected = 1;
    }

    showBankDetail() {
        this.tableData = this.myProxy.tableData.bankList;
        this.selected = 2;
    }

    showCoinDetail() {
        this.tableData = this.myProxy.tableData.coinlList;
        this.selected = 3;
    }

    // 排序
    private tableSortChange(column: any) {
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
    }

    // 打开用户详情
    private showUserDetail(user_id: number) {
        this.myProxy.onShowDetail(user_id);
    }

    // 刷新money
    private refreshGold(user_id: number) {
        this.myProxy.onRefrushGold(user_id);
    }
    // 打开扣除余额弹窗
    public onUpdateGold(row: any) {
        this.myProxy.showDialog(row);
    }

    // 状态切换
    private handleToggle(user_id: number, status: number) {
        this.myProxy.onToggleStatus(user_id, status);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.related {
    padding-top: 10px;
    padding-bottom: 32px;
}
.count {
    margin-right: 10px;
}
.selected {
    color: #1890ff;
}
</style>
