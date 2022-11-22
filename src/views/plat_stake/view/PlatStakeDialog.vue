<template>
    <el-dialog :title="title" :visible.sync="myProxy.dialogData.bShow" width="500px">
        <el-form ref="form" :rules="rules" :model="form" label-width="180px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.put_in_ratio.name}%`" prop="put_in_ratio">
                <el-input-number v-model="form.put_in_ratio" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item :label="`${tableColumns.put_out_ratio.name}%`" prop="put_out_ratio">
                <el-input-number v-model="form.put_out_ratio" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item :label="`${tableColumns.auto_withdraw_stake_fee.name}%`" prop="auto_withdraw_stake_fee">
                <el-input-number v-model="form.auto_withdraw_stake_fee" :min="0" :max="100" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item :label="`${tableColumns.manual_withdraw_stake_fee.name}%`" prop="manual_withdraw_stake_fee">
                <el-input-number
                    v-model="form.manual_withdraw_stake_fee"
                    :min="0"
                    :max="100"
                    :step="1"
                ></el-input-number>
            </el-form-item>
            <el-form-item :label="`${tableColumns.min_coin_count.name}`" prop="min_coin_count">
                <el-input-number v-model="form.min_coin_count" :min="0" :max="9999999999" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item :label="tableColumns.is_open_stake.name" prop="is_open_stake">
                <el-switch v-model="form.is_open_stake" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handlerUpdate">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatStakeProxy from "@/views/plat_stake/proxy/PlatStakeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class PlatStakeDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatStakeProxy = this.getProxy(PlatStakeProxy);
    // proxy property
    private tableColumns = this.myProxy.stakeLogtableData.columns;
    private form = this.myProxy.dialogData.form;

    private title = i18n.t("user_detail.dividendConfiguration");

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {};
    }

    private handlerUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdateStakeConfig();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
