<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" :placeholder="LangUtil('请选择')">
                    <el-option v-for="(item, key) of platIdOptions" :label="item" :value="key" :key="key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.title.name" prop="title">
                <el-input v-model="form.title" maxlength="30" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.url.name" prop="url">
                <el-input v-model="form.url" maxlength="300" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="LangUtil('状态')" prop="status">
                <el-radio v-model="form.status" label="1">{{ LangUtil("正常") }}</el-radio>
                <el-radio v-model="form.status" label="98">{{ LangUtil("关闭") }}</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ LangUtil("删除") }}</el-button>
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate('ruleForm') : handleAdd('ruleForm')">{{
                LangUtil("确认保存")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import VipReceivePaymentChannelProxy from "@/views/vip_receive_payment_channel/proxy/VipReceivePaymentChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class VipReceivePaymentChannelDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VipReceivePaymentChannelProxy = this.getProxy(VipReceivePaymentChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get platIdOptions() {
        let result: any = JSON.parse(JSON.stringify(this.myProxy.tableData.columns.plat_id.options));
        delete result[0];
        return result;
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: LangUtil("必须填写"), trigger: "blur" }],
            title: [
                { required: true, message: LangUtil("必须填写"), trigger: "blur" },
                { max: 30, message: LangUtil("30个字符限制"), trigger: "blur" },
            ],
            url: [
                { required: true, message: LangUtil("必须填写"), trigger: "blur" },
                { max: 200, message: LangUtil("200个字符限制"), trigger: "blur" },
            ],
            status: [{ required: true, message: LangUtil("必须选择"), trigger: "blur" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
