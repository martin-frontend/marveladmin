<template>
    <!-- 公共钱包上分/下分 -->
    <el-dialog :title="lengTextObj.title" width="480px" :visible.sync="myProxy.publicDialogData.wallet.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="170px" v-loading="net_status.loading">
            <el-form-item :label="lengTextObj.money" prop="gold">
                <el-input v-model.number="form.gold" :placeholder="lengTextObj.placeholderText"></el-input>
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
    form = this.myProxy.publicDialogData.wallet.form;
    title = this.myProxy.publicDialogData.wallet.title[this.form.type];
    lengTextObj: any = {
        title: LangUtil("公共钱包") + this.title,
        money: this.title + LangUtil("金额"),
        required: LangUtil("必须填写"),
        errorCode: LangUtil("范围必须在 0-999999999"),
        mustNumber: LangUtil("必须为数字值"),
        placeholderText: LangUtil("请输入0-999999999"),
    };

    // 验证金额范围
    checklimit(rule: any, value: any, callback: any): any {
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

    handleUpdate() {
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
