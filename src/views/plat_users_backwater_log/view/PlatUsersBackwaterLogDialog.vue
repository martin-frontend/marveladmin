<template>
    <el-dialog :title="$t('plat_users_backwater_log.userWaterDetail')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :model="form" label-width="135px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.user_id.name" prop="user_id" size="mini">
                {{ form.user_id }}
            </el-form-item>
            <el-form-item :label="tableColumns.nick_name.name" prop="nick_name" size="mini">
                {{ form.nick_name }}
            </el-form-item>
            <el-form-item :label="tableColumns.settlement_type.name" prop="settlement_type" size="mini">
                {{ tableColumns.settlement_type.options[form.settlement_type] }}
            </el-form-item>
            <el-form-item :label="tableColumns.total_water.name" prop="total_water" size="mini">
                {{ form.total_water }}
            </el-form-item>
            <el-form-item :label="tableColumns.total_backwater.name" prop="total_backwater" size="mini">
                <span v-html="getAccessInfo(form.total_backwater)"></span>
            </el-form-item>
            <el-form-item :label="tableColumns.created_at.name" prop="created_at"> {{ form.created_at }} </el-form-item>

            <el-form-item :label="$t('plat_users_backwater_log.settleDetail')" style="margin-bottom: 0rem">
            </el-form-item>
            <div class="line"></div>
            <el-table :data="form.detail" border fit highlight-current-row style="width: 100%" size="mini">


                <el-table-column :label="$t('plat_users_backwater_log.settleName')" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ tableColumns["water_"+row.vendor_type].name }}
                    </template>
                </el-table-column>
                <el-table-column :label="$t('common.settleWater')" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.water }}
                    </template>
                </el-table-column>

                <el-table-column :label="tableColumns.main_coin_name_unique.name+$t('plat_users_vip_model.backWater')" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.main_coin_name_unique }}：{{ row.main_coin_backwater_rate * 100 }}%
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns.main_coin_name_unique.name+$t('plat_users_backwater_log.rewardMoney')" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.main_coin_name_unique }}：{{ row.main_coin_backwater }}
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns.reward_coin_name_unique.name+$t('plat_users_vip_model.backWater')" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.reward_coin_name_unique }}：{{ row.reward_coin_backwater_rate * 100 }}%
                    </template>
                </el-table-column>
                <el-table-column :label="tableColumns.reward_coin_name_unique.name+$t('plat_users_backwater_log.rewardMoney')" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.reward_coin_name_unique }}：{{ row.reward_coin_backwater }}
                    </template>
                </el-table-column>

            </el-table>
            <div class="confirm">
                <el-button style="width: 8rem" @click="handlerConfirm()" type="primary" icon="">{{
                    $t("common.determine")
                }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersBackwaterLogProxy from "@/views/plat_users_backwater_log/proxy/PlatUsersBackwaterLogProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUsersBackwaterLogDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersBackwaterLogProxy = this.getProxy(PlatUsersBackwaterLogProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    private handlerConfirm() {
        this.myProxy.hideDialog();
    }

    getAccessInfo(data: any) {
        let infoStr = "";
        if (data) {
            const keys = Object.keys(data);
            for (const key of keys) {
                infoStr += key + "：";
                infoStr += data[key] + "<br>";
            }
        }
        return infoStr;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.line {
    width: 100%;
    height: 2px;
    border-top: solid #acc0d8 1px;
    margin-bottom: 1rem;
}
.confirm {
    margin-top: 2rem;
    text-align: right;
}
</style>
