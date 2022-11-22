<template>
    <!-- 用户进入游戏最高额度 -->
    <el-dialog :title="lengTextObj.title" width="720px" :visible.sync="myProxy.vendorDialogData.limit.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="170px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.is_limit_user_recharge.name" prop="is_limit_user_recharge">
                <el-radio-group v-model="form.is_limit_user_recharge">
                    <el-radio :label="0">{{ lengTextObj.notLimited }}</el-radio>
                    <el-radio :label="1"> {{ lengTextObj.limit }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="user_recharge_max">
                <el-input
                    v-if="form.is_limit_user_recharge === 1"
                    v-model.number="form.user_recharge_max"
                    :placeholder="lengTextObj.placeholderText"
                ></el-input>
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
    form = this.myProxy.vendorDialogData.limit.form;

    lengTextObj: any = {
        title: LangUtil("用户进入游戏最高额度"),
        notLimited: LangUtil("不限制"),
        limit: LangUtil("限制额度"),
        required: LangUtil("必须填写"),
        errorCode: LangUtil("范围必须在 0-999999999"),
        mustNumber: LangUtil("必须为数字值"),
        placeholderText: LangUtil("请输入0-999999999"),
    };

    // 验证金额范围
    checklimit(rule: any, value: any, callback: any): any {
        if (value === null) {
            callback(new Error(this.lengTextObj.required));
        } else if (parseInt(value) < 0 || parseInt(value) > 999999999) {
            callback(new Error(this.lengTextObj.errorCode));
        } else {
            callback();
        }
    }

    get rules() {
        const rule0 = {
            is_limit_user_recharge: [{ required: true, message: this.lengTextObj.required, trigger: "change" }],
        };
        const rule1 = {
            is_limit_user_recharge: [{ required: true, message: this.lengTextObj.required, trigger: "change" }],
            user_recharge_max: [
                { validator: this.checklimit, trigger: "blur" },
                { type: "number", message: this.lengTextObj.mustNumber },
            ],
        };
        return this.form.is_limit_user_recharge === 0 ? rule0 : rule1;
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onVenderLimitUpdate();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
