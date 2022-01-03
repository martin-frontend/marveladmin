<template>
    <el-dialog :title="$t('coin_receive_recharge_order.titleText1')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" :label-width="width" v-loading="net_status.loading">
            <el-form-item :label="$t('common.userID')">
                {{ form.user_id }}
            </el-form-item>
            <el-form-item :label="$t('common.userNickName')">
                {{ form.nick_name }}
            </el-form-item>
            <el-form-item :label="$t('coin_receive_recharge_order.rechargeCertificate')">
                {{ form.user_recharge_certificate }}
            </el-form-item>
            <el-form-item :label="$t('common.orderAmount')">
                {{ form.gold }}
            </el-form-item>
            <el-form-item :label="$t('coin_receive_recharge_order.actualGold')" prop="actual_gold">
                <el-input v-model="form.actual_gold" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
            </el-form-item>
            <el-form-item>
                <p class="ps">{{ $t("coin_receive_recharge_order.remarks") }}</p>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="myProxy.dialogData.bShow = false">{{ $t("common.cancel") }}</el-button>
                <el-button
                    type="primary"
                    @click="handleSubmit"
                    v-if="checkUnique(unique.coin_receive_recharge_order_confirm)"
                    >{{ $t("common.determine") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
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
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CoinReceiveRechargeOrderProxy = this.getProxy(CoinReceiveRechargeOrderProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
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

    private validateGold = (rule: any, value: any, callback: any) => {
        let requiredInput: any = this.$t("common.requiredInput");
        let errorCode: any = this.$t("coin_receive_recharge_order.errorCode");
        if (value === "") {
            callback(new Error(requiredInput));
        } else if (parseInt(value) > this.myProxy.dialogData.formSource.gold) {
            callback(new Error(errorCode));
        } else {
            callback();
        }
    };

    private handleSubmit() {
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
