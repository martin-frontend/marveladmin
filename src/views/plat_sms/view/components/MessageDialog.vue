<template>
    <el-dialog :title="LangUtil('短信测试')" :visible="myProxy.messageDialogData.bShow" width="500px" @close="hide">
        <el-form ref="refForm" :rules="rules" :model="form">
            <el-form-item :label="LangUtil('输入接受测试短信手机号码')" prop="mobile">
                <el-input clearable :placeholder="LangUtil('请输入手机号码')" v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="onConfirm" class="item" type="primary" icon="">{{ LangUtil("确定") }}</el-button>
                <el-button @click="hide" class="item" type="primary" icon="">{{ LangUtil("取消") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import PlatSmsProxy from "../../proxy/PlatSmsProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { checkPhoneSms } from "@/core/global/Functions";

@Component
export default class MessageDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatSmsProxy = this.getProxy(PlatSmsProxy);
    // proxy property
    form = this.myProxy.messageDialogData.form;

    get rules() {
        return {
            mobile: [{ required: true, message: this.LangUtil("手机号码未填写"), trigger: "change" }],
        };
    }

    onConfirm() {
        (this.$refs["refForm"] as any & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                if (!checkPhoneSms(this.form.mobile)) {
                    let error: any = this.LangUtil("请输入正确的手机号码");
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
