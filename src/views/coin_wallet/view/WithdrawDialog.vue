<template>
    <el-dialog :visible.sync="myProxy.withdrawData.bShow" :title="$t('common.withdraw')">
        <el-form ref="refForm" :rules="rules" :model="form" label-width="150px">
            <el-form-item :label="tableColumns.admin_username.name">{{ username }} </el-form-item>
               <el-form-item :label="tableColumns.plat_id.name">{{ tableColumns.plat_id.options[form.plat_id] }} </el-form-item>
            <el-form-item :label="tableColumns.gold.name">{{ form.gold }} </el-form-item>
            <el-form-item :label="$t('coin_wallet.withdrawMoney')" prop="amount">
                <el-input
                    clearable
                    :placeholder="$t('coin_wallet.input')"
                    v-model="form.amount"
                    type="number"
                    min="1"
                    max="9999999999"
                    oninput="value=value.replace(/[^0-9]/g,'');if(value >9999999999)value=9999999999"
                ></el-input>
            </el-form-item>
            <div class="footer">
                <el-button @click="confirm()" type="primary" icon="">{{ $t("common.determine") }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "../../../core/abstract/AbstractView";
import { Component, Watch } from "vue-property-decorator";
import { Form } from "element-ui";
import CoinWalletProxy from "@/views/coin_wallet/proxy/CoinWalletProxy";

@Component
export default class WithdrawDialog extends AbstractView {
    // proxy
    private myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.withdrawData.form;
    }
    get username() {
        return this.myProxy.withdrawData.form.admin_username;
    }
    // 表单验证
    private rules = {
        amount: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
    };

    @Watch("myProxy.withdrawData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["refForm"] as Form & { clearValidate: () => void }).clearValidate();
        });
    }

    private confirm() {
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
