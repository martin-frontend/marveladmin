<template>
    <el-dialog :title="`${textMap[status]}` + $t('email_vender.title')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :model="form" label-width="130px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.email_vendor_name.name" prop="email_vendor_name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.email_vendor_name"
                ></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.email_vendor_name_unique.name" prop="email_vendor_name_unique">
                <el-input
                    class="email_vendor_name_unique"
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
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
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { unique, checkUnique } from "@/core/global/Permission";
import SystemEmailProxy from "../proxy/SystemEmailProxy";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class SystemEmailDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemEmailProxy = this.getProxy(SystemEmailProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            area_code: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
