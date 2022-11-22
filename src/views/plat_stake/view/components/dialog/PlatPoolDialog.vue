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
                <el-button type="primary" size="mini" @click="save">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
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
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    private tableColumns = this.myProxy.stakePooltableData.columns;
    private dialogData = this.myProxy.stakePooltableData.dialogData;
    private form = this.myProxy.stakePooltableData.dialogData.form;

    private title = i18n.t("user_detail.prizePoolSettings");
    private pool_type_title = i18n.t("user_detail.howToSet");
    private poolType = 1;
    private poolTypeOptions: any = {
        1: i18n.t("user_detail.manualEntry"),
        2: i18n.t("user_detail.percentageAuto"),
    };
    private poolTypeMap = {
        1: i18n.t("user_detail.dividendAmount"),
        2: i18n.t("user_detail.percentage") + "%",
    };
    get rules() {
        return {
            put_in_amount: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            put_in_ratio: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }
    get isManual() {
        return this.form.pool_type == 1;
    }

    @Watch("form.pool_type")
    private onPoolTypeChange(type: number) {
        this.myProxy.resetPoolDialog(type);
    }

    private save() {
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
