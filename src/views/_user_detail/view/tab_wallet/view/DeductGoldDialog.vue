<template>
    <el-dialog :title="LangUtil('用户扣除金币')" :append-to-body="true" :visible.sync="dialogDeductGoldData.bShow">
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
                <el-input
                    disabled
                    v-model="userInfo.gold_info[dialogDeductGoldData.coin_name_unique].plat_money"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('扣除数量')">
                <el-input
                    v-model="dialogDeductGoldData.gold"
                    type="number"
                    min="0"
                    onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
                <div style="color: #ff0000">
                    {{ LangUtil("扣除玩家金币只能扣除玩家平台余额。如果金币在厂商以及保险箱里，可进行先提取") }}
                </div>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="onDeductGold">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Message, MessageBox } from "element-ui";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class DeductGoldDialog extends AbstractView {
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

    constructor() {
        super();
    }

    onDeductGold() {
        const deductGold = this.dialogDeductGoldData.gold == "" ? 0 : parseFloat(this.dialogDeductGoldData.gold);
        if (
            deductGold > 0 &&
            deductGold <= parseFloat(this.userInfo.gold_info[this.dialogDeductGoldData.coin_name_unique].plat_money)
        ) {
            MessageBox.confirm(this.LangUtil("undefined"), this.LangUtil("提示"), {
                confirmButtonText: this.LangUtil("确定"),
                cancelButtonText: this.LangUtil("取消"),
                type: "warning",
                center: true,
            }).then(() => {
                this.myProxy.onUpdateGold(deductGold, this.dialogDeductGoldData.coin_name_unique);
            });
        } else {
            let errorCode: any = this.LangUtil("请输入正确的扣除金额，大于0，小于平台余额");
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
