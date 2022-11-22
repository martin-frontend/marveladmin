<template>
    <el-dialog :title="langTextObj.title" width="480px" :visible.sync="myProxy.vendorDialogData.wallet.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="170px" v-loading="net_status.loading">
            <el-form-item :label="langTextObj.money" prop="gold">
                <el-input v-model.number="form.gold" :placeholder="langTextObj.placeholderText"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.vendorDialogData.wallet.form;
    title = this.myProxy.vendorDialogData.wallet.title[this.form.type];

    langTextObj: any = {
        title: LangUtil("厂商") + this.title,
        money: this.title + " " + LangUtil("金额"),
        required: LangUtil("必须填写"),
        errorCode: LangUtil("范围必须在 0-999999999"),
        mustNumber: LangUtil("必须为数字值"),
        placeholderText: LangUtil("请输入0-999999999"),
    };

    // 验证金额范围
    checklimit(rule: any, value: any, callback: any): any {
        if (value === "") {
            callback(new Error(this.langTextObj.required));
        } else if (parseInt(value) < 1 || parseInt(value) > 999999999) {
            callback(new Error(this.langTextObj.errorCode));
        } else {
            callback();
        }
    }

    get rules() {
        return {
            gold: [
                { required: true, message: this.langTextObj.required, trigger: "blur" },
                { type: "number", message: this.langTextObj.mustNumber },
                { validator: this.checklimit, trigger: "blur" },
            ],
        };
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onVenderWalletUpdate();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
