<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="600px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select
                    filterable
                    clearable
                    v-model="form.plat_id"
                    :placeholder="LangUtil('请选择')"
                    :disabled="isStatusUpdate"
                    @change="OnChangePlatId"
                >
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :key="key"
                        :label="item"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns['vendor_id'].name" prop="vendor_id">
                <el-select filterable clearable v-model="form.vendor_id" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.vendor_id.options[form.plat_id]"
                        :key="key"
                        :label="item"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns['tax'].name" prop="tax">
                <el-input
                    v-model="form.tax"
                    :placeholder="LangUtil('请输入')"
                    onkeyup="this.value=(this.value.match(/\d+(.\d{0,2})?/)||[''])[0]"
                    @blur="inputAmountTaxChange"
                >
                </el-input>
                <span style="color:red;">%</span>
            </el-form-item>
        </el-form>
        <div class="btn_group">
            <span>
                <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">
                    {{ LangUtil("删除") }}
                </el-button>
            </span>
            <span>
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </span>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatProfitTaxProxy from "../proxy/PlatProfitTaxProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class PlatProfitTaxDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatProfitTaxProxy = this.getProxy(PlatProfitTaxProxy);
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
            vendor_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            tax: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
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

    OnChangePlatId() {
        this.form.vendor_id = "";
    }

    inputAmountTaxChange(e: any) {
        this.form.tax = e.target.value;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-input {
    width: 217px;
}
.btn_group {
    display: flex;
    justify-content: space-between;
    position: relative;
}
</style>
