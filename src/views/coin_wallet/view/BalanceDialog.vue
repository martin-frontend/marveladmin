<template>
    <el-dialog :visible.sync="myProxy.balanceData.bShow" :title="LangUtil('余额')" width="500">
        <el-table :data="coin_user" border fit highlight-current-row style="width: 100%" size="mini">
            <el-table-column
                :label="LangUtil('币种')"
                prop="coin_name_unique"
                class-name="status-col"
            ></el-table-column>
            <el-table-column :label="LangUtil('金额')" prop="gold" class-name="status-col"></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import GlobalVar from "@/core/global/GlobalVar";
import SelfModel from "@/core/model/SelfModel";
import CoinWalletProxy from "../proxy/CoinWalletProxy";

@Component
export default class BlanaceDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    selfModel: SelfModel = this.getProxy(SelfModel);
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    coin_user = this.selfModel.userInfo.coin_user;
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
