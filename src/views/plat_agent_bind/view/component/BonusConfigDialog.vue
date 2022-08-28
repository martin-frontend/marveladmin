<template>
    <el-dialog
        :title="$t('plat_agent_bind.bonusStatistics')"
        :visible.sync="myProxy.bonusConfigDialogData.bShow"
        width="600px"
    >
        <el-form ref="form" :model="form" label-width="160px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.invite_user_id.name" prop="invite_user_id">
                <span style="width: 120px"> {{ form.invite_user_id }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.invite_nick_name.name" prop="invite_nick_name">
                <span style="width: 120px" type="number"> {{ form.invite_nick_name }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.invite_bonus_ratio.name" prop="invite_bonus_ratio">
                <span style="width: 120px" type="number"> {{ form.invite_bonus_ratio }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.user_id.name" prop="user_id">
                <span style="width: 120px" type="number"> {{ form.user_id }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.nick_name.name" prop="nick_name">
                <span style="width: 120px" type="number"> {{ form.nick_name }}</span>
            </el-form-item>
            <!-- 缺少计算分红 -->
            <el-form-item :label="tableColumns.is_show.name" prop="is_show">
                <el-switch v-model="form.is_show" :active-value="0" :inactive-value="1"></el-switch>
            </el-form-item>
            <!-- 缺少i18n -->
            <el-form-item :label="'分红统计筛选'">
                <span style="width: 120px">{{ "玩家输赢" }}</span>
            </el-form-item>
            <el-form-item>
                <el-checkbox :label="tableColumns.win_loss_2.name" v-model="form.win_loss_2"> </el-checkbox>
                <el-checkbox :label="tableColumns.win_loss_4.name" v-model="form.win_loss_4"> </el-checkbox>
                <el-checkbox :label="tableColumns.win_loss_8.name" v-model="form.win_loss_8"> </el-checkbox>
                <el-checkbox :label="tableColumns.win_loss_16.name" v-model="form.win_loss_16"> </el-checkbox>
                <el-checkbox :label="tableColumns.win_loss_32.name" v-model="form.win_loss_32"> </el-checkbox>
                <el-checkbox :label="tableColumns.win_loss_64.name" v-model="form.win_loss_64"> </el-checkbox>
                <el-checkbox :label="tableColumns.win_loss_128.name" v-model="form.win_loss_128"> </el-checkbox>
            </el-form-item>
            <el-form-item>
                <span style="width: 120px">{{ "推广佣金" }}</span>
            </el-form-item>
            <el-form-item>
                <el-checkbox :label="tableColumns.commission_2.name" v-model="form.commission_2"> </el-checkbox>
                <el-checkbox :label="tableColumns.commission_4.name" v-model="form.commission_4"> </el-checkbox>
                <el-checkbox :label="tableColumns.commission_8.name" v-model="form.commission_8"> </el-checkbox>
                <el-checkbox :label="tableColumns.commission_16.name" v-model="form.commission_16"> </el-checkbox>
                <el-checkbox :label="tableColumns.commission_32.name" v-model="form.commission_32"> </el-checkbox>
                <el-checkbox :label="tableColumns.commission_64.name" v-model="form.commission_64"> </el-checkbox>
                <el-checkbox :label="tableColumns.commission_128.name" v-model="form.commission_128"> </el-checkbox>
            </el-form-item>
            <el-form-item>
                <span style="width: 120px">{{ "挖矿返水" }}</span>
            </el-form-item>
            <el-form-item>
                <el-checkbox :label="tableColumns.backwater_2.name" v-model="form.backwater_2"> </el-checkbox>
                <el-checkbox :label="tableColumns.backwater_4.name" v-model="form.backwater_4"> </el-checkbox>
                <el-checkbox :label="tableColumns.backwater_8.name" v-model="form.backwater_8"> </el-checkbox>
                <el-checkbox :label="tableColumns.backwater_16.name" v-model="form.backwater_16"> </el-checkbox>
                <el-checkbox :label="tableColumns.backwater_32.name" v-model="form.backwater_32"> </el-checkbox>
                <el-checkbox :label="tableColumns.backwater_64.name" v-model="form.backwater_64"> </el-checkbox>
                <el-checkbox :label="tableColumns.backwater_128.name" v-model="form.backwater_128"> </el-checkbox>
            </el-form-item>
            <el-form-item>
                <span style="width: 120px">{{ "厂商游戏费用" }}</span>
            </el-form-item>
            <el-form-item>
                <el-checkbox :label="tableColumns.vendor_fee_2.name" v-model="form.vendor_fee_2"> </el-checkbox>
                <el-checkbox :label="tableColumns.vendor_fee_4.name" v-model="form.vendor_fee_4"> </el-checkbox>
                <el-checkbox :label="tableColumns.vendor_fee_8.name" v-model="form.vendor_fee_8"> </el-checkbox>
                <el-checkbox :label="tableColumns.vendor_fee_16.name" v-model="form.vendor_fee_16"> </el-checkbox>
                <el-checkbox :label="tableColumns.vendor_fee_32.name" v-model="form.vendor_fee_32"> </el-checkbox>
                <el-checkbox :label="tableColumns.vendor_fee_64.name" v-model="form.vendor_fee_64"> </el-checkbox>
                <el-checkbox :label="tableColumns.vendor_fee_128.name" v-model="form.vendor_fee_128"> </el-checkbox>
            </el-form-item>
            <el-form-item>
                <span style="width: 120px">{{ "其它" }}</span>
            </el-form-item>
            <el-form-item>
                <el-checkbox :label="tableColumns.activity_bonus.name" v-model="form.activity_bonus"> </el-checkbox>
                <el-checkbox :label="tableColumns.recharge_fee.name" v-model="form.recharge_fee"> </el-checkbox>
                <el-checkbox :label="tableColumns.exchange_fee.name" v-model="form.exchange_fee"> </el-checkbox>
            </el-form-item>
            <el-form-item :label="'分红参数配置'"> </el-form-item>
            <el-form-item>
                <el-input v-model="form.bonus_pool_ratio">{{ tableColumns.bonus_pool_ratio.name }}</el-input>
            </el-form-item>
            <div class="dialog-footer">
                <el-button type="primary" @click="handleSave()">{{ $t("common.save") }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "@/views/plat_agent_bind/proxy/PlatAgentBindProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";
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
                this.myProxy.updateAgentBonus();
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
