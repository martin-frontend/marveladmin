<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id" label-width="100px"> 
                {{ form["plat_id"] }}
            </el-form-item>

            <el-form-item :label="`${tableColumns.created_at.name}`" prop="created_at" label-width="100px">
                {{ form["created_at"] }}
            </el-form-item>

            <el-form-item :label="`${tableColumns.created_by.name}`" prop="created_by" label-width="100px">
                {{ form["created_by"] }}
            </el-form-item>

            <el-form-item :label="`${tableColumns.updated_at.name}`" prop="updated_at" label-width="100px">
                {{ form["updated_at"] }}
            </el-form-item>
            <el-form-item :label="`${tableColumns.updated_by.name}`" prop="updated_by" label-width="100px">
                {{ form["updated_by"] }}
            </el-form-item>

            <el-form-item :label="`${tableColumns.register_ip.name}`" prop="register_ip" label-width="100px">
                {{ form["register_ip"] }}
            </el-form-item>

            <el-form-item
                :label="`${tableColumns.register_ip_count.name}`"
                prop="register_ip_count"
                label-width="100px"
            >
            {{ form["register_ip_count"] }}
            </el-form-item>

            <el-form-item
                :label="`${tableColumns.register_ip_locked_count.name}`"
                prop="register_ip_locked_count"
                label-width="100px"
            >
            {{ form["register_ip_locked_count"] }}
            </el-form-item>

            <el-form-item :label="`${tableColumns.status.name}`" prop="status" label-width="100px">
                <el-select
                    style="width:100%"
                    v-model="form.status"
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.status.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="`${tableColumns.remark.name}`" prop="remark">
                <el-input
                    :rows="3"
                    type="textarea"
                    filterable
                    clearable
                    class="select"
                    :placeholder="LangUtil('请输入')"
                    v-model="form.remark"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="checkUnique(unique.store_fake_bet)"
                    type="primary"
                    size="mini"
                    @click="handlerSave()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatRegisterSameIpLogProxy from "../proxy/PlatRegisterSameIpLogProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class PlatRegisterSameIpLogDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatRegisterSameIpLogProxy = this.getProxy(PlatRegisterSameIpLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    private textMap = {
        update: "编辑",
        create: "新增",
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
        return {};
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
    handlerSave() {
        //this.myProxy.store_fake_bet();
        this.myProxy.onUpdate();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
