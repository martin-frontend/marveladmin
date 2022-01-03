<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="90px" v-loading="net_status.loading">
            <!-- 参数名称  -->
            <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <!-- 参数描述 -->
            <el-form-item :label="tableColumns.des.name" prop="des">
                <el-input type="textarea" v-model="form.des"></el-input>
            </el-form-item>
            <!-- 参数标识 -->
            <el-form-item :label="tableColumns.key.name" prop="key">
                <el-input v-model="form.key"></el-input>
            </el-form-item>
             <!-- 参数分類 -->
            <el-form-item :label="tableColumns.category.name" prop="category">
                <el-select v-model="form.category" filterable class="select" :placeholder="$t('common.requiredSelect')">
                    <el-option
                        v-for="(value, key) in tableColumns.category.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 参数类型 -->
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">{{ tableColumns.type.options[1] }}</el-radio>
                    <el-radio :label="2">{{ tableColumns.type.options[2] }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 参数值 -->
            <el-form-item :label="tableColumns.value.name" prop="value">
                <el-input v-model="form.value"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">{{
                    $t("common.delete")
                }}</el-button>
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemConfigProxy from "@/views/system_config/proxy/SystemConfigProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class SystemConfigDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemConfigProxy = this.getProxy(SystemConfigProxy);
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
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            key: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            des: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "blur" }],
            value: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            category: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
