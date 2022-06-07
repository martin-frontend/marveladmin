<template>
    <div v-loading="net_status.loading">
        <!-- 新的页面 -->
        <div>
            <div class="title">
                平台资产
                <el-button class="title-btn" type="primary" @click="refreshMoney">
                    刷新
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
                <el-table-column label="币种" prop="coin_name_unique" class-name="status-col"> </el-table-column>
                <el-table-column label="账户余额" prop="sum_money" class-name="status-col"> </el-table-column>
                <el-table-column label="平台余额" prop="plat_money" class-name="status-col"> </el-table-column>
                <el-table-column label="操作" class-name="status-col">
                    <template slot-scope="{ row }">
                        <el-button class="item" type="primary" @click="handlerDeductGold(row)">
                            扣款
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <div class="title">
                厂商资产
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
                <el-table-column label="游戏厂商" prop="vendor_name" class-name="status-col"> </el-table-column>
                <el-table-column label="余额" prop="currency" class-name="status-col"> </el-table-column>
                <el-table-column label="币种" prop="coin_name_unique" class-name="status-col"> </el-table-column>
                <el-table-column label="操作" class-name="status-col">
                    <template slot-scope="{ row }">
                        <el-button class="item" type="primary" @click="withdrawVendor(row)">
                            提取
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 扣款页面 -->
        <DeductGoldDialog v-if="dialogDeductGoldData.bShow"/>
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
    private dialogDeductGoldData = this.myProxy.dialogDeductGoldData;

    constructor() {
        super(TabWalletMediator);
    }

    private handlerDeductGold(row:any) {
        this.myProxy.showDialog(row.coin_name_unique);
    }

    private refreshMoney() {
        this.myProxy.getGoldInfo(this.userInfo.user_id);
    }

    // private withdrawAll() {
    //     this.myProxy.withdrawVendor();
    // }

    private withdrawVendor(row: any) {
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
.title-btn{
    float:right;
    margin-top: -10px;
}
</style>
