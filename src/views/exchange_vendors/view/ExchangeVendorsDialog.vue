<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="750px">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-position="right"
            label-width="130px"
            v-loading="net_status.loading"
        >
            <el-form-item size="mini" :label="tableColumns.name.name" prop="name">
                <el-input v-model="form.name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.english_name.name" prop="english_name">
                <el-input v-model="form.english_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.currency_type.name" prop="currency_type">
                <el-select v-model="form.currency_type" filterable class="select" :placeholder="LangUtil('请选择')">
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
            <el-form-item size="mini" :label="tableColumns.payment_method_type.name" prop="payment_method_type">
                <el-checkbox-group v-model="form.payment_method_type">
                    <el-checkbox
                        v-for="(value, key) in tableColumns.payment_method_type.options"
                        :key="key"
                        :label="key"
                        >{{ value }}</el-checkbox
                    >
                </el-checkbox-group>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.callback_url.name" prop="callback_url">
                <el-input v-model="form.callback_url" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.api_url.name" prop="api_url">
                <el-input v-model="form.api_url" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.refund_url.name" prop="refund_url">
                <el-input v-model="form.refund_url" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.extend_params.name" prop="extend_params">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.extend_params" />
                </div>
            </el-form-item>

            <el-form-item size="mini" :label="LangUtil('状态')" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="key">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.exchange_vendors_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    v-if="checkUnique(unique.exchange_vendors_update)"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import ExchangeVendorsProxy from "@/views/exchange_vendors/proxy/ExchangeVendorsProxy";
import JsonEditor from "@/components/JsonEditor/index.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        JsonEditor,
    },
})
export default class ExchangeVendorsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeVendorsProxy = this.getProxy(ExchangeVendorsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
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
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            english_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            payment_method_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            callback_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            api_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            refund_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            currency_scale: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            currency_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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
