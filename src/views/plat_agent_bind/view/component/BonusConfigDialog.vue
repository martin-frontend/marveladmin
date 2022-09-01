<template>
    <el-dialog
        :title="$t('plat_agent_bind.bonusStatistics')"
        :visible.sync="myProxy.bonusConfigDialogData.bShow"
        width="600px"
        top="5vh"
    >
        <el-form ref="form" :model="form" label-width="160px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.invite_user_id.name" prop="invite_user_id">
                <span style="width: 120px"> {{ form.invite_user_id }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.invite_nick_name.name" prop="invite_nick_name">
                <span style="width: 120px"> {{ form.invite_nick_name }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.invite_bonus_ratio.name" prop="invite_bonus_ratio">
                <span style="width: 120px"> {{ form.invite_bonus_ratio }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.user_id.name" prop="user_id">
                <span style="width: 120px"> {{ form.user_id }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.nick_name.name" prop="nick_name">
                <span style="width: 120px"> {{ form.nick_name }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.bonus_ratio.name" prop="bonus_ratio">
                <el-input-number
                    controls-position="right"
                    :min="0"
                    :max="100"
                    v-model="form.bonus_ratio"
                ></el-input-number>
                <span style="margin-left: 10px">%</span>
            </el-form-item>
            <el-form-item :label="tableColumns.is_show.name" prop="is_show">
                <el-switch v-model="form.is_show" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <template v-if="myProxy.bonusConfigDialogData.isCanEditConfig == 1">
                <el-form-item :label="$t('plat_agent_bind.bonusConfig')">
                    <span style="width: 120px">{{ $t("plat_agent_bind.winLoss") }}</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :label="tableColumns.win_loss_2.name" v-model="form.bonus_config.win_loss_2">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.win_loss_4.name" v-model="form.bonus_config.win_loss_4">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.win_loss_8.name" v-model="form.bonus_config.win_loss_8">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.win_loss_16.name" v-model="form.bonus_config.win_loss_16">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.win_loss_32.name" v-model="form.bonus_config.win_loss_32">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.win_loss_64.name" v-model="form.bonus_config.win_loss_64">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.win_loss_128.name" v-model="form.bonus_config.win_loss_128">
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <span style="width: 120px">{{ $t("plat_agent_bind.bonus_pool") }}</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :label="tableColumns.bonus_pool_2.name" v-model="form.bonus_config.bonus_pool_2">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.bonus_pool_4.name" v-model="form.bonus_config.bonus_pool_4">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.bonus_pool_8.name" v-model="form.bonus_config.bonus_pool_8">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.bonus_pool_16.name" v-model="form.bonus_config.bonus_pool_16">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.bonus_pool_32.name" v-model="form.bonus_config.bonus_pool_32">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.bonus_pool_64.name" v-model="form.bonus_config.bonus_pool_64">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.bonus_pool_128.name" v-model="form.bonus_config.bonus_pool_128">
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <span style="width: 120px">{{ $t("plat_agent_bind.commission") }}</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :label="tableColumns.commission_2.name" v-model="form.bonus_config.commission_2">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.commission_4.name" v-model="form.bonus_config.commission_4">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.commission_8.name" v-model="form.bonus_config.commission_8">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.commission_16.name" v-model="form.bonus_config.commission_16">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.commission_32.name" v-model="form.bonus_config.commission_32">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.commission_64.name" v-model="form.bonus_config.commission_64">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.commission_128.name" v-model="form.bonus_config.commission_128">
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <span style="width: 120px">{{ $t("plat_agent_bind.backwater") }}</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :label="tableColumns.backwater_2.name" v-model="form.bonus_config.backwater_2">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.backwater_4.name" v-model="form.bonus_config.backwater_4">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.backwater_8.name" v-model="form.bonus_config.backwater_8">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.backwater_16.name" v-model="form.bonus_config.backwater_16">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.backwater_32.name" v-model="form.bonus_config.backwater_32">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.backwater_64.name" v-model="form.bonus_config.backwater_64">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.backwater_128.name" v-model="form.bonus_config.backwater_128">
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <span style="width: 120px">{{ $t("plat_agent_bind.vendor") }}</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :label="tableColumns.vendor_fee_2.name" v-model="form.bonus_config.vendor_fee_2">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.vendor_fee_4.name" v-model="form.bonus_config.vendor_fee_4">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.vendor_fee_8.name" v-model="form.bonus_config.vendor_fee_8">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.vendor_fee_16.name" v-model="form.bonus_config.vendor_fee_16">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.vendor_fee_32.name" v-model="form.bonus_config.vendor_fee_32">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.vendor_fee_64.name" v-model="form.bonus_config.vendor_fee_64">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.vendor_fee_128.name" v-model="form.bonus_config.vendor_fee_128">
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <span style="width: 120px">{{ $t("plat_agent_bind.else") }}</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox :label="tableColumns.activity_bonus.name" v-model="form.bonus_config.activity_bonus">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.recharge_fee.name" v-model="form.bonus_config.recharge_fee">
                    </el-checkbox>
                    <el-checkbox :label="tableColumns.exchange_fee.name" v-model="form.bonus_config.exchange_fee">
                    </el-checkbox>
                </el-form-item>
                <el-form-item :label="$t('plat_agent_bind.configSetting')"> </el-form-item>
                <el-form-item>
                    <el-form-item
                        style="margin-bottom: 10px"
                        :label="tableColumns.bonus_pool_ratio.name"
                        label-width="130px"
                    >
                        <el-input-number controls-position="right" :min="0" :max="100" v-model="form.bonus_pool_ratio">
                        </el-input-number>
                        <span style="margin-left: 10px">%</span>
                    </el-form-item>
                    <el-form-item
                        style="margin-bottom: 10px"
                        :label="tableColumns.exchange_fee_ratio.name"
                        label-width="130px"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="0"
                            :max="100"
                            v-model="form.exchange_fee_ratio"
                        >
                        </el-input-number>
                        <span style="margin-left: 10px">%</span>
                    </el-form-item>
                    <el-form-item
                        style="margin-bottom: 10px"
                        :label="tableColumns.recharge_fee_ratio.name"
                        label-width="130px"
                    >
                        <el-input-number
                            controls-position="right"
                            :min="0"
                            :max="100"
                            v-model="form.recharge_fee_ratio"
                        >
                        </el-input-number>
                        <span style="margin-left: 10px">%</span>
                    </el-form-item>
                    <el-form-item :label="tableColumns.vendor_fee_ratio.name" label-width="130px">
                        <el-input-number controls-position="right" :min="0" :max="100" v-model="form.vendor_fee_ratio">
                        </el-input-number>
                        <span style="margin-left: 10px">%</span>
                    </el-form-item>
                </el-form-item>
                <div class="dialog-footer">
                    <el-button
                        v-if="checkUnique(unique.plat_agent_bonus_config_update)"
                        type="primary"
                        @click="handleSave()"
                        >{{ $t("common.save") }}</el-button
                    >
                </div>
            </template>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "@/views/plat_agent_bind/proxy/PlatAgentBindProxy";
import { Component, Vue } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { inputOnlyPositive } from "@/core/global/Functions";

@Component
export default class BonusConfigDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    tableColumns = this.myProxy.bonusConfigDialogData.tableData.columns;
    form = this.myProxy.bonusConfigDialogData.form;
    inputLimit = inputOnlyPositive;

    handleSave() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.updateBonusConfig();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.el-form {
    padding: 0 20px;
}
</style>
