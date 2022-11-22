<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="800px">
        <el-form ref="form" :rules="rules" :model="form" label-width="110px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input clearable maxlength="30" :placeholder="LangUtil('请输入')" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.english_name.name" prop="english_name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="LangUtil('请输入')"
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
                <el-input clearable :placeholder="LangUtil('请输入')" v-model="form.callback_url"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.info_url.name" prop="info_url">
                <el-input clearable :placeholder="LangUtil('请输入')" v-model="form.info_url"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.api_url.name" prop="api_url">
                <el-input clearable :placeholder="LangUtil('请输入')" v-model="form.api_url"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.query_url.name" prop="query_url">
                <el-input clearable :placeholder="LangUtil('请输入')" v-model="form.query_url"></el-input>
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
                <el-button
                    type="danger"
                    size="mini"
                    v-if="isStatusUpdate == true && checkUnique(unique.recharge_vendors_delete)"
                    @click="handleDelete(form)"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    type="primary"
                    v-if="checkUnique(unique.recharge_vendors_update)"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargeVendorsProxy = this.getProxy(RechargeVendorsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    // Global Function
    inputOnlyPositive = inputOnlyPositive;

    textMap = {
        create: this.LangUtil("新增"),
        update: this.LangUtil("编辑"),
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
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            english_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            support_paymethods: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            callback_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            info_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            api_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            query_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            status: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
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
.footer {
    display: flex;
}
</style>
