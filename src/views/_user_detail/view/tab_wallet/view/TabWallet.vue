<template>
    <div v-loading="net_status.loading">
        <!-- 新的页面 -->
        <div>
            <div class="title">
                {{ LangUtil("平台资产") }}
                <el-button class="title-btn" type="primary" @click="refreshMoney">
                    {{ LangUtil("刷新") }}
                </el-button>
            </div>
            <el-table
                :data="myProxy.platMoney"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{
                    'text-align': 'center',
                }"
                size="mini"
            >
                <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('账户余额')" prop="sum_money" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('平台余额')" prop="plat_money" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('操作')" class-name="status-col" width="300">
                    <template slot-scope="{ row }">
                        <el-button
                            class="item"
                            type="primary"
                            @click="handlerTransfer(row)"
                            v-if="myProxy.userInfo.is_credit_user == 1"
                        >
                            {{ LangUtil("划转") }}
                        </el-button>
                        <el-button class="item" type="primary" @click="handlerDeductGold(row)">
                            {{ LangUtil("扣款") }}
                        </el-button>
                        <el-button class="item" type="primary" @click="handlerRechargeAddress(row)">
                            <!-- 充值地址 -->
                            {{ LangUtil("充值地址") }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <div class="title">
                <!-- 厂商资产 -->
                {{ LangUtil("厂商资产") }}
            </div>
            <el-table
                :data="myProxy.vendorMoney"
                border
                fit
                highlight-current-row
                style="width: 100%"
                :header-cell-style="{
                    'text-align': 'center',
                }"
                size="mini"
            >
                <el-table-column :label="LangUtil('游戏厂商')" prop="vendor_name" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('余额')" prop="currency" class-name="status-col"> </el-table-column>
                <el-table-column :label="LangUtil('币种')" prop="coin_name_unique" class-name="status-col">
                </el-table-column>
                <el-table-column :label="LangUtil('操作')" class-name="status-col">
                    <template slot-scope="{ row }">
                        <el-button class="item" type="primary" @click="withdrawVendor(row)">
                            <!-- 提取 -->
                            {{ LangUtil("提取") }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 扣款页面 -->
        <DeductGoldDialog v-if="dialogDeductGoldData.bShow" />
        <RechargeAddressDialog v-if="dialogRechargeAddress.bShow" />
        <TransferDialog v-if="dialogTransferData.bShow" />
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabWalletMediator from "../mediator/TabWalletMediator";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { getProxy } from "@/views/_user_detail/PageSetting";
import GlobalVar from "@/core/global/GlobalVar";
import DeductGoldDialog from "./DeductGoldDialog.vue";
import RechargeAddressDialog from "./RechargeAddressDialog.vue";
import TransferDialog from "./TransferDialog.vue";

@Component({
    components: {
        DeductGoldDialog,
        RechargeAddressDialog,
        TransferDialog,
    },
})
export default class TabWallet extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabWalletProxy = getProxy(TabWalletProxy);
    tableColumns = this.myProxy.tableColumns;
    userInfo = this.myProxy.userInfo;
    dialogDeductGoldData = this.myProxy.dialogDeductGoldData;
    dialogRechargeAddress = this.myProxy.dialogRechargeAddress;
    dialogTransferData = this.myProxy.dialogTransferData;

    constructor() {
        super(TabWalletMediator);
    }

    handlerTransfer(row: any) {
        this.myProxy.showTransferDialog(row.coin_name_unique);
    }

    handlerDeductGold(row: any) {
        this.myProxy.showDialog(row.coin_name_unique);
    }

    handlerRechargeAddress(row: any) {
        this.myProxy.showRechargeAddressDialog(row.coin_name_unique);
    }

    refreshMoney() {
        this.myProxy.getGoldInfo(this.userInfo.user_id);
    }

    //  withdrawAll() {
    //     this.myProxy.withdrawVendor();
    // }

    withdrawVendor(row: any) {
        this.myProxy.withdrawVendor(row.coin_name_unique, row.vendor_id);
    }

    destroyed() {
        super.destroyed();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.title {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
}
.title-btn {
    float: right;
    margin-top: -10px;
}
</style>
