<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="700px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select
                    :disabled="isStatusUpdate"
                    v-model="form.plat_id"
                    filterable
                    clearable
                    class="select"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['plat_id'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['from_coin'].name" prop="from_coin">
                <el-select
                    :disabled="isStatusUpdate"
                    v-model="form.from_coin"
                    filterable
                    clearable
                    class="select"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['from_coin'].options[form.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['to_coin'].name" prop="to_coin">
                <el-select
                    :disabled="isStatusUpdate"
                    v-model="form.to_coin"
                    filterable
                    clearable
                    class="select"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['to_coin'].options[form.plat_id]"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['rate'].name" prop="rate">
                <el-input
                    v-model="form.rate"
                    onkeyup="this.value=(this.value.match(/\d+(.\d{0,18})?/)||[''])[0]"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio
                        v-for="(value, key) in tableColumns.status.options"
                        :key="Number(key)"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatCurrencyConversionRateProxy from "../proxy/PlatCurrencyConversionRateProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class PlatCurrencyConversionRateDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatCurrencyConversionRateProxy = this.getProxy(PlatCurrencyConversionRateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
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
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            from_coin: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            to_coin: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            rate: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
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
