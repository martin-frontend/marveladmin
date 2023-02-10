<template>
    <el-dialog :visible.sync="myProxy.goldLimitData.bShow" :title="tableColumns.single_order_gold_limit.name">
        <el-form ref="refForm" :rules="rules" :model="form" label-width="130px">
            <el-form-item :label="tableColumns.single_order_gold_min.name" prop="single_order_gold_min">
                <el-input v-model="form.single_order_gold_min" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.single_order_gold_max.name" prop="single_order_gold_min">
                <el-input v-model="form.single_order_gold_max" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
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
import { Form } from "element-ui";
import { Component, Watch } from "vue-property-decorator";
import CoinWalletProxy from "@/views/coin_wallet/proxy/CoinWalletProxy";

@Component
export default class DepositDialog extends AbstractView {
    LangUtil = LangUtil;
    // proxy
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.goldLimitData.form;
    }

    // 表单验证
    rules = {
        single_order_gold_min: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        single_order_gold_max: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
    };

    // @Watch("myProxy.depositData.bShow")
    //  onWatchShow() {
    //     this.$nextTick(() => {
    //         (this.$refs["refForm"] as Form & { clearValidate: () => void }).clearValidate();
    //     });
    // }

    confirm() {
        (this.$refs["refForm"] as Form & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onGoldLimitUpdate();
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
