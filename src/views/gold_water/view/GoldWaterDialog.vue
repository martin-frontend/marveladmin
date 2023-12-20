<template>
    <el-dialog :title="LangUtil('添加流水审核')" :visible.sync="myProxy.dialogData.bShow" width="600px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.user_id.name" prop="user_id">
                <el-input
                    v-model="form.user_id"
                    :placeholder="LangUtil('请输入')"
                    oninput="value=value.replace(/[^\d]/g,'');"
                    @blur="inputUserIdChange"
                >
                </el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.water_limit.name" prop="water_limit">
                <el-input
                    v-model="form.water_limit"
                    :placeholder="LangUtil('请输入')"
                    onkeyup="this.value=(this.value.match(/\d+(.\d{0,3})?/)||[''])[0]"
                    @blur="inputWaterLimit"
                >
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleAddWaterLimit()">
                {{ LangUtil("确认保存") }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import GoldWaterProxy from "../proxy/GoldWaterProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class GoldWaterDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: GoldWaterProxy = this.getProxy(GoldWaterProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            water_limit: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAddWaterLimit() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAddWaterLimit();
            }
        });
    }

    inputUserIdChange(e: any) {
        this.form.user_id = e.target.value;
    }

    inputWaterLimit(e: any) {
        this.form.water_limit = e.target.value;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
