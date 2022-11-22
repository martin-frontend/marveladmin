<template>
    <el-dialog :title="title" :visible.sync="dialogData.bShow" width="450px">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                {{ tableColumns.plat_id.options[form.plat_id] }}
            </el-form-item>
            <el-form-item size="mini" :label="pool_type_title" prop="pool_type">
                <el-radio-group v-model="form.pool_type">
                    <el-radio v-for="(value, key) in poolTypeOptions" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="poolTypeMap[form.pool_type]" prop="put_in_amount" v-if="isManual">
                <el-input-number v-model="form.put_in_amount" :min="0" :max="9999999999" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item :label="poolTypeMap[form.pool_type]" prop="put_in_ratio" v-else>
                <el-input-number v-model="form.put_in_ratio" :min="0" :max="100" :step="0.01"></el-input-number>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="save">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import PlatStakeProxy from "../../../proxy/PlatStakeProxy";
import Pagination from "@/components/Pagination.vue";
import i18n from "@/lang";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUserLogDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    tableColumns = this.myProxy.stakePooltableData.columns;
    dialogData = this.myProxy.stakePooltableData.dialogData;
    form = this.myProxy.stakePooltableData.dialogData.form;

    title = LangUtil("奖池设定");
    pool_type_title = LangUtil("设定方式");
    poolType = 1;
    poolTypeOptions: any = {
        1: LangUtil("手动输入"),
        2: LangUtil("百分比自动"),
    };
    poolTypeMap = {
        1: LangUtil("分红金额"),
        2: LangUtil("百分比") + "%",
    };
    get rules() {
        return {
            put_in_amount: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            put_in_ratio: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }
    get isManual() {
        return this.form.pool_type == 1;
    }

    @Watch("form.pool_type")
    onPoolTypeChange(type: number) {
        this.myProxy.resetPoolDialog(type);
    }

    save() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.updateStakeConfig();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
