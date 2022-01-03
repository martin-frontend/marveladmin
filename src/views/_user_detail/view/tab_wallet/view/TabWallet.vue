<template>
    <div v-loading="net_status.loading">
        <div class="money-bar">
            <div class="money-box">
                <div class="money-info">
                    <div>{{ tableColumns.balance.name }}</div>
                    <div>{{ userInfo.gold_info.sum_money }}</div>
                </div>
                <div class="refresh-box" @click="refreshMoney">
                    <i class="el-icon-refresh" :class="{ refresh: myProxy.refreshing, stop: !myProxy.refreshing }"></i>
                </div>
            </div>
            <div class="money-box">
                <div class="money-info">
                    <div>{{ tableColumns.gold.name }}</div>
                    <div>{{ userInfo.gold_info.plat_money }}</div>
                </div>
            </div>
            <div class="money-box">
                <div class="money-info">
                    <div>{{ tableColumns.safe_gold.name }}</div>
                    <div>{{ userInfo.gold_info.safe_gold }}</div>
                </div>
                <div class="refresh-box">
                    <el-button
                        type="primary"
                        @click="withdrawSafeBox"
                        style="margin-left: 10px"
                        v-if="checkUnique(unique.plat_user_withdraw)"
                    >
                        {{ $t("user_detail.withdraw") }}
                    </el-button>
                </div>
            </div>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 20px">
            <el-tooltip effect="dark" :content="$t('user_detail.balanceTip')" placement="top">
                <i class="el-icon-question" style="font-size: 20px"></i>
            </el-tooltip>
            <div style="font-size: 16px; font-weight: bold; margin-right: 10px">
                {{ $t("user_detail.vendorBalance") }}
            </div>
            <div>{{ userInfo.gold_info.vendors_money }}</div>
            <el-button
                type="primary"
                @click="withdrawAll"
                style="margin-left: 10px"
                v-if="checkUnique(unique.plat_user_withdraw)"
            >
                {{ $t("user_detail.withdrawAll") }}
            </el-button>
        </div>
        <el-button
            type="primary"
            @click="handlerDeductGold"
            style="right: 10px; position: absolute; top:0px;"
            v-if="checkUnique(unique.plat_user_withdraw)"
        >
            {{ $t("user_detail.deduct") }}
        </el-button>
        <el-table
            :data="userInfo.gold_info.vendors_detail"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
        >
            <el-table-column :label="$t('user_detail.gameVendor')" prop="vendor_name"> </el-table-column>

            <el-table-column :label="$t('user_detail.balance')" prop="gold"> </el-table-column>
            <el-table-column :label="$t('common.operating')" width="100px" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-button
                        class="item"
                        type="primary"
                        @click="withdrawVendor(row)"
                        v-if="checkUnique(unique.plat_user_withdraw)"
                    >
                        {{ $t("user_detail.withdraw") }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 扣款页面 -->
        <DeductGoldDialog />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabWalletMediator from "../mediator/TabWalletMediator";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import DeductGoldDialog from "./DeductGoldDialog.vue";

@Component({
    components: {
        DeductGoldDialog,
    },
})
export default class TabWallet extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabWalletProxy = getProxy(TabWalletProxy);
    private tableColumns = this.myProxy.tableColumns;
    private userInfo = this.myProxy.userInfo;

    constructor() {
        super(TabWalletMediator);
    }

    private handlerDeductGold() {
        this.myProxy.showDialog();
    }

    private refreshMoney() {
        this.myProxy.refreshing = true;
        this.myProxy.getGoldInfo(this.userInfo.user_id);
    }

    private withdrawSafeBox() {
        this.myProxy.withdrawSafeBox();
    }

    private withdrawAll() {
        this.myProxy.withdrawVendor();
    }

    private withdrawVendor(row: any) {
        this.myProxy.withdrawVendor(row.vendor_id);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.money-bar {
    display: flex;
    .money-box {
        display: flex;
        align-items: center;
        border: 1px solid #dddddd;
        padding: 10px;
        margin-left: 10px;
        margin-bottom: 20px;
        margin-top: 10px;
        &:first-child {
            margin-left: 0;
        }
        .money-info {
            div {
                &:first-child {
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 5px;
                }
            }
        }
        .refresh-box {
            margin-left: 10px;
            i {
                font-size: 20px;
                cursor: pointer;
                animation: none;
                &.refresh {
                    animation: rotating 1s linear infinite;
                }
            }
        }
    }
}
</style>
