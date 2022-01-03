<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-form ref="form" :rules="rules" :model="form" label-width="110px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.name"
                ></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.english_name.name" prop="english_name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.english_name"
                ></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio v-for="(value, key) in tableColumns.type.options" :key="key" :label="key">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.currency_type.name" prop="currency_type">
                <el-select
                    v-model="form.currency_type"
                    filterable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.currency_type.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.currency_scale.name" prop="currency_scale">
                <el-input
                    style="width: 90px; margin-right: 8px"
                    type="number"
                    step="1"
                    min="0"
                    v-model="form.currency_scale"
                    oninput="value=parseInt(value);value=value.replace(/[^\d]/g,'')"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.support_paymethods.name" prop="support_paymethods">
                <el-checkbox
                    v-for="(key, value) in tableColumns.support_paymethods.options"
                    :key="key"
                    :label="Number(value)"
                    v-model="form.support_paymethods"
                >
                    {{ key }}
                </el-checkbox>
            </el-form-item>
            <el-form-item :label="tableColumns.callback_url.name" prop="callback_url">
                <el-input clearable :placeholder="$t('common.pleaseEnter')" v-model="form.callback_url"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.info_url.name" prop="info_url">
                <el-input clearable :placeholder="$t('common.pleaseEnter')" v-model="form.info_url"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.api_url.name" prop="api_url">
                <el-input clearable :placeholder="$t('common.pleaseEnter')" v-model="form.api_url"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.query_url.name" prop="query_url">
                <el-input clearable :placeholder="$t('common.pleaseEnter')" v-model="form.query_url"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.extend_params.name" prop="extend_params">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.extend_params" />
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="key">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="danger" size="mini" v-if="isStatusUpdate == true && checkUnique(unique.recharge_vendors_delete)" @click="handleDelete(form)">{{
                    $t("common.delete")
                }}</el-button>
                <el-button type="primary" v-if="checkUnique(unique.recharge_vendors_update)" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import JsonEditor from "@/components/JsonEditor/index.vue";
import { DialogStatus } from "@/core/global/Constant";
import RechargeVendorsProxy from "@/views/recharge_vendors/proxy/RechargeVendorsProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { unique, checkUnique } from "@/core/global/Permission";
import { inputOnlyPositive } from "@/core/global/Functions";

@Component({
    components: {
        JsonEditor,
    },
})
export default class RechargeVendorsDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: RechargeVendorsProxy = this.getProxy(RechargeVendorsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    // Global Function
    private inputOnlyPositive = inputOnlyPositive;

    private textMap = {
        create: this.$t("common.create"),
        update: this.$t("common.update"),
    };
    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            english_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            support_paymethods: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            callback_url: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            info_url: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            api_url: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            query_url: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            status: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            currency_scale: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            currency_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
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
.footer {
    display: flex;
}
</style>
