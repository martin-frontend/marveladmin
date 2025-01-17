<template>
    <el-dialog :title="`${textMap[status]}`" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :model="form" label-width="130px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.email_vendor_name.name" prop="email_vendor_name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="LangUtil('请输入')"
                    v-model="form.email_vendor_name"
                ></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.email_vendor_name_unique.name" prop="email_vendor_name_unique">
                <el-input
                    class="email_vendor_name_unique"
                    clearable
                    maxlength="30"
                    :placeholder="LangUtil('请输入')"
                    v-model="form.email_vendor_name_unique"
                ></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.extends.name" prop="extends">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.extends" />
                </div>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="danger" size="mini" @click="handleDelete()">{{ LangUtil("删除") }}</el-button>
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { unique, checkUnique } from "@/core/global/Permission";
import EmailVendorProxy from "../proxy/EmailVendorProxy";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class EmailVendorDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: EmailVendorProxy = this.getProxy(EmailVendorProxy);
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
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            area_code: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
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
        this.myProxy.onDelete(this.form.email_vendor_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.area_code {
    width: 120px;
}
</style>
