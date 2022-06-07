<template>
    <el-dialog
        :title="$t('user_detail.userDeductMoney')"
        :append-to-body="true"
        :visible.sync="dialogDeductGoldData.bShow"
    >
        <el-form ref="form" :model="userInfo" label-width="70px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                <el-input disabled v-model="userInfo.user_id"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                <el-input disabled v-model="userInfo.nick_name"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="币种" prop="coin_name_unique">
                <el-input disabled v-model="dialogDeductGoldData.coin_name_unique"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['gold'].name" prop="gold">
                <el-input disabled v-model="userInfo.gold_info[dialogDeductGoldData.coin_name_unique].plat_money"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="$t('user_detail.deductMoney')">
                <el-input
                    v-model="dialogDeductGoldData.gold"
                    type="number"
                    min="0"
                    onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
                <div style="color: #ff0000">
                    {{ $t("user_detail.withdrawHint") }}
                </div>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="onDeductGold">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Message, MessageBox } from "element-ui";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class DeductGoldDialog extends AbstractView {
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
        super();
    }

    private onDeductGold() {
        const deductGold = this.dialogDeductGoldData.gold == "" ? 0 : parseFloat(this.dialogDeductGoldData.gold);
        if (deductGold > 0 && deductGold <= parseFloat(this.userInfo.gold_info[this.dialogDeductGoldData.coin_name_unique].plat_money)) {
            MessageBox.confirm(
                this.$t("common.confirmDeductMoney", { "0": deductGold }),
                this.$t("common.prompt"),
                {
                    confirmButtonText: this.$t("common.determine"),
                    cancelButtonText: this.$t("common.cancel"),
                    type: "warning",
                    center: true,
                }
            ).then(() => {
                this.myProxy.onUpdateGold(deductGold, this.dialogDeductGoldData.coin_name_unique);
            });
        } else {
            let errorCode: any = this.$t("common.moneyInputError");
            Message.error({
                type: "error",
                message: errorCode,
            });
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
