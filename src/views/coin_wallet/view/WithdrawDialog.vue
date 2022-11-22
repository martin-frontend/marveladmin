<template>
    <el-dialog :visible.sync="myProxy.withdrawData.bShow" :title="LangUtil('下分')">
        <el-form ref="refForm" :rules="rules" :model="form" label-width="150px">
            <el-form-item :label="tableColumns.admin_username.name">{{ username }} </el-form-item>
            <el-form-item :label="tableColumns.plat_id.name"
                >{{ tableColumns.plat_id.options[form.plat_id] }}
            </el-form-item>
            <el-form-item :label="tableColumns.gold.name">{{ form.gold }} </el-form-item>
            <el-form-item :label="LangUtil('下分金额')" prop="amount">
                <el-input
                    clearable
                    :placeholder="LangUtil('请输入1~9999999999')"
                    v-model="form.amount"
                    type="number"
                    min="1"
                    max="9999999999"
                    oninput="value=value.replace(/[^0-9]/g,'');if(value >9999999999)value=9999999999"
                ></el-input>
            </el-form-item>
            <div class="footer">
                <el-button @click="confirm()" type="primary" icon="">{{ LangUtil("确定") }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "../../../core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import CoinWalletProxy from "@/views/coin_wallet/proxy/CoinWalletProxy";

@Component
export default class WithdrawDialog extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.withdrawData.form;
    }
    get username() {
        return this.myProxy.withdrawData.form.admin_username;
    }
    // 表单验证
    rules = {
        amount: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
    };

    @Watch("myProxy.withdrawData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["refForm"] as Form & { clearValidate: () => void }).clearValidate();
        });
    }

    confirm() {
        (this.$refs["refForm"] as Form & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onWithdraw(this.form);
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.footer {
    text-align: right;
}
</style>
