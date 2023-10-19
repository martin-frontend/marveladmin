<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="700px">
        <el-form ref="form" style="overflow-y: auto; max-height: 70vh;" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id" label-width="100px">
                <el-select
                    style="width:100%"
                    v-model="form.plat_id"
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="`${tableColumns.area_region.name}`" prop="area_region" label-width="100px">
                <el-select
                    style="width:100%"
                    v-model="form.area_region"
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                    @change="form.default_sms_area_code = ''"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.area_region.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                :label="`${tableColumns.default_sms_area_code.name}`"
                prop="default_sms_area_code"
                label-width="100px"
            >
                <el-select
                    style="width:100%"
                    v-model="form.default_sms_area_code"
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.default_sms_area_code.options[form.area_region]"
                        :key="key"
                        :label="`(+${key}) ${value}`"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="form.area_region"
                :label="`${tableColumns.show_sms_area_code.name}`"
                prop="show_sms_area_code"
                label-width="100px"
            >
                <el-checkbox-group v-model="form.show_sms_area_code">
                    <el-checkbox v-for="(value, key) in tableColumns.show_sms_area_code.options[form.area_region]" :key="key" :label="key">
                        (+{{ value.area_code }}) {{ value.name }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete()">{{
                    LangUtil("删除")
                }}</el-button>
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAreaRegionProxy from "@/views/plat_area_region/proxy/PlatAreaRegionProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAreaRegionDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAreaRegionProxy = this.getProxy(PlatAreaRegionProxy);
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
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            area_region: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            default_sms_area_code: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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
