<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="650px">
        <el-form ref="form" :rules="rules" :model="form" label-width="95px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('选择时间')" prop="created_date">
                <el-date-picker
                    v-model="form.created_date"
                    type="date"
                    align="right"
                    :placeholder="LangUtil('选择开始时间')"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['username'].name" prop="username">
                <el-input
                    :disabled="isStatusUpdate"
                    v-model="form.username"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
            <!-- 充值 -->
            <el-form-item size="mini" :label="LangUtil('充值金额')" prop="total_recharge">
                <el-input
                    oninput="value=value.replace(/^(\-)*(\d)\.(\d\d\d).*$/, '$1$2.$3');"
                    v-model="form.total_recharge"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
            <!-- 流水 -->
            <el-form-item size="mini" :label="LangUtil('用户流水')" prop="total_water">
                <el-input
                    oninput="value=value.replace(/^(\-)*(\d)\.(\d\d\d).*$/, '$1$2.$3');"
                    v-model="form.total_water"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
            <!-- 输赢 -->
            <el-form-item size="mini" :label="LangUtil('输赢')" prop="total_win">
                <el-input
                    oninput="value=value.replace(/^(\-)*(\d)\.(\d\d\d).*$/, '$1$2.$3');"
                    v-model="form.total_win"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                LangUtil("确认保存")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUserStatisticRankDaysProxy from "@/views/plat_user_statistic_rank_days/proxy/PlatUserStatisticRankDaysProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUserStatisticRankDaysDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.myProxy;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
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
    validateNumber = (rule: any, value: any, callback: any) => {
        let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{3})$/;
        if (value == "") {
            callback();
        } else if (!reg.test(value)) {
            //@ts-ignore
            callback(new Error(this.LangUtil("必须填写")));
        } else {
            callback();
        }
    };
    //验证小数点
    validatePoint: any = [
        {
            validator: this.validateNumber,
            message: this.LangUtil("只能输入正数字，正浮点数，小数点后三位"),
            trigger: "change",
        },
    ];
    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            username: [{ required: true, validator: this.validateUserName.bind(this), trigger: "blur" }],
            created_date: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            total_recharge: this.validatePoint,
            total_water: this.validatePoint,
            total_win: this.validatePoint,
        };
    }

    /**验证用户 */
    validateUserName(rule: any, value: any, callback: any) {
        if (value && checkUserName(value)) {
            callback();
        } else {
            let errorCode: any = this.LangUtil("4-20位字符，字母与数字组合");
            callback(new Error(errorCode));
        }
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
