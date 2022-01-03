<template>
    <!-- 公共钱包上分/下分 -->
    <el-dialog :title="lengTextObj.title" width="480px" :visible.sync="myProxy.publicDialogData.wallet.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="170px" v-loading="net_status.loading">
            <el-form-item :label="lengTextObj.money" prop="gold">
                <el-input v-model.number="form.gold" :placeholder="lengTextObj.placeholderText"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatVendorsWalletProxy from "@/views/plat_vendors_wallet/proxy/PlatVendorsWalletProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class PlatVendorsWalletDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.publicDialogData.wallet.form;
    private title = this.myProxy.publicDialogData.wallet.title[this.form.type];
    private lengTextObj: any = {
        title: i18n.t("plat_vendors_wallet.publicWallet") + this.title,
        money: this.title + i18n.t("common.money"),
        required: i18n.t("common.requiredInput"),
        errorCode: i18n.t("plat_vendors_wallet.errorCode"),
        mustNumber: i18n.t("plat_vendors_wallet.mustNumber"),
        placeholderText: i18n.t("plat_vendors_wallet.placeholderText"),
    };

    // 验证金额范围
    private checklimit(rule: any, value: any, callback: any): any {
        if (value === "") {
            callback(new Error(this.lengTextObj.required));
        } else if (parseInt(value) < 1 || parseInt(value) > 999999999) {
            callback(new Error(this.lengTextObj.errorCode));
        } else {
            callback();
        }
    }

    get rules() {
        return {
            gold: [
                { required: true, message: this.lengTextObj.required, trigger: "blur" },
                { type: "number", message: this.lengTextObj.mustNumber },
                { validator: this.checklimit, trigger: "blur" },
            ],
        };
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onPublicWalletUpdate();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
