<template>
    <el-dialog :title="LangUtil('确定充值订单')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" :label-width="width" v-loading="net_status.loading">
            <el-form-item :label="LangUtil('用户ID')">
                {{ form.user_id }}
            </el-form-item>
            <el-form-item :label="LangUtil('用户昵称')">
                {{ form.nick_name }}
            </el-form-item>
            <el-form-item :label="LangUtil('支付凭证')">
                {{ form.user_recharge_certificate }}
            </el-form-item>
            <el-form-item :label="LangUtil('订单金额')">
                {{ form.gold }}
            </el-form-item>
            <el-form-item :label="LangUtil('付款金额')" prop="actual_gold">
                <el-input v-model="form.actual_gold" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
            </el-form-item>
            <el-form-item>
                <p class="ps">
                    {{ LangUtil("备注：请确认用户的转账金额，为用户实际付款金额，设置金额不能超过订单金额") }}
                </p>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="myProxy.dialogData.bShow = false">{{ LangUtil("取消") }}</el-button>
                <el-button
                    type="primary"
                    @click="handleSubmit"
                    v-if="checkUnique(unique.coin_receive_recharge_order_confirm)"
                    >{{ LangUtil("确定") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CoinReceiveRechargeOrderProxy from "@/views/coin_receive_recharge_order/proxy/CoinReceiveRechargeOrderProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";

@Component
export default class CoinReceiveRechargeOrderDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinReceiveRechargeOrderProxy = this.getProxy(CoinReceiveRechargeOrderProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            actual_gold: [{ required: true, validator: this.validateGold, trigger: "blur" }],
        };
    }
    get width() {
        let _w: string = "150px";
        if (Cookies.get("language") === "vi") {
            _w = "150px";
        }
        return _w;
    }

    validateGold = (rule: any, value: any, callback: any) => {
        let requiredInput: any = this.LangUtil("必须填写");
        let errorCode: any = this.LangUtil("付款金额，不能超过订单金额!");
        if (value === "") {
            callback(new Error(requiredInput));
        } else if (parseInt(value) > this.myProxy.dialogData.formSource.gold) {
            callback(new Error(errorCode));
        } else {
            callback();
        }
    };

    handleSubmit() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onOrderConfirm();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
