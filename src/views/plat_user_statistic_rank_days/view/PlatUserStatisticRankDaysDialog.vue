<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="650px">
        <el-form ref="form" :rules="rules" :model="form" label-width="95px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="$t('component.dateSelect')" prop="created_date">
                <el-date-picker
                    v-model="form.created_date"
                    type="date"
                    align="right"
                    :placeholder="$t('component.startFrom')"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['username'].name" prop="username">
                <el-input
                    :disabled="isStatusUpdate"
                    v-model="form.username"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <!-- 充值 -->
            <el-form-item size="mini" :label="$t('common.rechargeAmount')" prop="total_recharge">
                <el-input
                    oninput="value=value.replace(/^(\-)*(\d)\.(\d\d\d).*$/, '$1$2.$3');"
                    v-model="form.total_recharge"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <!-- 流水 -->
            <el-form-item size="mini" :label="$t('common.userWater')" prop="total_water">
                <el-input
                    oninput="value=value.replace(/^(\-)*(\d)\.(\d\d\d).*$/, '$1$2.$3');"
                    v-model="form.total_water"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <!-- 输赢 -->
            <el-form-item size="mini" :label="$t('statistic_user_days.WinOrLose')" prop="total_win">
                <el-input
                    oninput="value=value.replace(/^(\-)*(\d)\.(\d\d\d).*$/, '$1$2.$3');"
                    v-model="form.total_win"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                $t("common.save")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUserStatisticRankDaysProxy from "@/views/plat_user_statistic_rank_days/proxy/PlatUserStatisticRankDaysProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUserStatisticRankDaysDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUserStatisticRankDaysProxy = this.getProxy(PlatUserStatisticRankDaysProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
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
    private validateNumber = (rule: any, value: any, callback: any) => {
        let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{3})$/;
        if (value == "") {
            callback();
        } else if (!reg.test(value)) {
            //@ts-ignore
            callback(new Error(this.$t("common.requiredInput")));
        } else {
            callback();
        }
    };
    //验证小数点
    private validatePoint: any = [
        {
            validator: this.validateNumber,
            message: this.$t("recharge_orders.makeErrorCode1"),
            trigger: "change",
        },
    ];
    get rules() {
        return {
            plat_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            username: [{ required: true, validator: this.validateUserName.bind(this), trigger: "blur" }],
            created_date: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            total_recharge: this.validatePoint,
            total_water: this.validatePoint,
            total_win: this.validatePoint,
        };
    }

    /**验证用户 */
    private validateUserName(rule: any, value: any, callback: any) {
        if (value && checkUserName(value)) {
            callback();
        } else {
            let errorCode: any = this.$t("admin_user.errorCode1");
            callback(new Error(errorCode));
        }
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
