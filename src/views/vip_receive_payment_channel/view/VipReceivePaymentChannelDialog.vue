<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" :placeholder="$t('common.pleaseChoose')">
                    <el-option v-for="(item, key) of platIdOptions" :label="item" :value="key" :key="key"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.title.name" prop="title">
                <el-input v-model="form.title" maxlength="30" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.url.name" prop="url">
                <el-input v-model="form.url" maxlength="300" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.status')" prop="status">
                <el-radio v-model="form.status" label="1">{{ $t("common.normal") }}</el-radio>
                <el-radio v-model="form.status" label="98">{{ $t("common.close") }}</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ $t("common.delete") }}</el-button>
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate('ruleForm') : handleAdd('ruleForm')">{{
                $t("common.save")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
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
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VipReceivePaymentChannelProxy = this.getProxy(VipReceivePaymentChannelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: i18n.t("common.update"),
        create: i18n.t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
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
            plat_id: [{ required: true, message: i18n.t("common.requiredInput"), trigger: "blur" }],
            title: [
                { required: true, message: i18n.t("common.requiredInput"), trigger: "blur" },
                { max: 30, message: i18n.t("vip_receive_payment_channel.errorCode30"), trigger: "blur" },
            ],
            url: [
                { required: true, message: i18n.t("common.requiredInput"), trigger: "blur" },
                { max: 200, message: i18n.t("vip_receive_payment_channel.errorCode200"), trigger: "blur" },
            ],
            status: [{ required: true, message: i18n.t("common.requiredSelect"), trigger: "blur" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    private handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
