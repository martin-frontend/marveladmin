<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.payMethodDialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="135px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="plat_id">
                {{ tableColumns.plat_id.options[form.plat_id] }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.exchange_channel_id.name" prop="exchange_vendor_id"
                >{{ myProxy.tableData.columns.exchange_vendors_id.options[form.exchange_vendors_id] }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.payment_method_type.name" prop="payment_method_type">
                {{ tableColumns.payment_method_type.options[form.payment_method_type] }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.min_gold.name" prop="min_gold">
                <el-input v-model="form.min_gold" :placeholder="tableColumns.min_gold.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.max_gold.name" prop="max_gold">
                <el-input v-model="form.max_gold" :placeholder="tableColumns.max_gold.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.free_time.name" prop="free_time">
                <el-input v-model="form.free_time" :placeholder="tableColumns.free_time.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.fee.name" prop="fee">
                <el-input v-model="form.fee" :placeholder="tableColumns.fee.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.min_fee.name" prop="min_fee">
                <el-input v-model="form.min_fee" :placeholder="tableColumns.min_fee.name">\ </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.balance.name" prop="balance">
                <el-input v-model="form.balance" :placeholder="tableColumns.balance.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.subtitle.name" prop="subtitle">
                <el-input
                    v-model="form.subtitle"
                    :placeholder="form.subtitle"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import ExchangeChannelProxy from "@/views/exchange_channel/proxy/ExchangeChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class ExchangeChannelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: ExchangeChannelProxy = this.getProxy(ExchangeChannelProxy);
    // proxy property
    private tableColumns = this.myProxy.payMethodDialogData.columns;
    private form = this.myProxy.payMethodDialogData.form;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.payMethodDialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {};
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAddPayMethod();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdatePayMethod();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
