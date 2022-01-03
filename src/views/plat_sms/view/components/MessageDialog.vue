<template>
    <el-dialog :title="$t('plat_sms.smsTest')" :visible="myProxy.messageDialogData.bShow" width="500px" @close="hide">
        <el-form ref="refForm" :rules="rules" :model="form">
            <el-form-item :label="$t('plat_sms.phoneNumberInput')" prop="mobile">
                <el-input
                    clearable
                    maxlength="11"
                    :placeholder="$t('common.mobilePhone')"
                    v-model="form.mobile"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="onConfirm" class="item" type="primary" icon="">{{
                    $t("common.determine")
                }}</el-button>
                <el-button @click="hide" class="item" type="primary" icon="">{{ $t("common.cancel") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatSmsProxy from "../../proxy/PlatSmsProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { checkPhone } from "@/core/global/Functions";

@Component
export default class MessageDialog extends AbstractView {
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatSmsProxy = this.getProxy(PlatSmsProxy);
    // proxy property
    private form = this.myProxy.messageDialogData.form;

    get rules() {
        return {
            mobile: [{ required: true, message: this.$t("plat_sms.requirePhoneNumber"), trigger: "change" }],
        };
    }

    onConfirm() {
        (this.$refs["refForm"] as any & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                if (!checkPhone(this.form.mobile)) {
                    let error: any = this.$t("plat_sms.inputCorrectNumber");
                    this.$message({
                        type: "error",
                        message: error,
                    });
                    return;
                }
                this.myProxy.sendMessage();
            }
        });
    }
    hide() {
        this.myProxy.hideMessageDialog();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
