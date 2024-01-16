<template>
    <el-dialog :title="LangUtil('编辑直属分红模版')" :visible.sync="myProxy.dialogSettingData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['settlement_type'].name" prop="settlement_type">
                <el-select v-model="form.settlement_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['settlement_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['settlement_period'].name" prop="settlement_period">
                <el-select v-model="form.settlement_period" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['settlement_period'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('参与渠道')">
                <el-button type="primary" size="mini" @click="handleChannel()">
                    {{ LangUtil("配置渠道") }}
                </el-button>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['max_level'].name">
                <el-select v-model="form.max_level" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['max_level'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="levels">
                <div>
                    <el-table
                        ref="multipleTable"
                        class="status-col"
                        :data="form.commission_config.commission_config"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%"
                        size="mini"
                        :row-class-name="rowClassName"
                    >
                        <el-table-column :label="LangUtil('等级')" type="index" width="80"></el-table-column>
                        <el-table-column :label="LangUtil('等级描述名称')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input
                                    v-model="row.level_desc"
                                    :placeholder="LangUtil('请输入')"
                                    style="width: 100%"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('直属亏损金额')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.loss_amount"
                                    style="width: 100%"
                                    :min="0"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="LangUtil('直属亏损分红百分比')" min-width="100">
                            <template slot-scope="{ row }">
                                <el-input-number
                                    type="number"
                                    v-model="row.loss_bonus_ratio"
                                    style="width: 100%"
                                    :min="0"
                                    :max="30"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleUpdate()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDirectlyCommissionProxy from "../proxy/StatisticPlatDirectlyCommissionProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class StatisticPlatDirectlyCommissionSettingDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDirectlyCommissionProxy = this.getProxy(StatisticPlatDirectlyCommissionProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogSettingData.form;
    LangUtil = LangUtil;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    get rules() {
        return {
            settlement_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            settlement_period: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
        };
    }

    handleChannel() {
        this.myProxy.showChannelDialog();
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let errorCode1: any = this.LangUtil("直属亏损金额需要大于0，没有小数点");
                let errorCode2: any = this.LangUtil("直属亏损金额没有输入数据");
                let errorCode3: any = this.LangUtil("直属亏损分红百分比没有输入数据");
                let errorCode4: any = this.LangUtil("等级描述名称最多50个字符");
                let isValide = true;
                const config: any = this.myProxy.dialogSettingData.form.commission_config.commission_config;

                const element = config;
                element.forEach((item: any) => {
                    if (!isValide) return;
                    if (!this.isMaxLength50(item.level_desc)) {
                        this.$message.warning(errorCode4);
                        isValide = false;
                        return;
                    } else if (item.loss_amount === undefined) {
                        this.$message.warning(errorCode2);
                        isValide = false;
                        return;
                    } else if (item.loss_bonus_ratio === undefined) {
                        this.$message.warning(errorCode3);
                        isValide = false;
                        return;
                    } else if (!this.isPositiveInteger(item.loss_amount)) {
                        this.$message.warning(errorCode1);
                        isValide = false;
                        return;
                    }
                });

                if (!isValide) {
                    return;
                }
                this.myProxy.onUpdateSetting();
            }
        });
    }

    isMaxLength50(str: any) {
        return str.length <= 50;
    }

    isPositiveInteger(number: any) {
        return Number.isInteger(number) && number >= 0;
    }

    //每一行的回调方法
    rowClassName({ rowIndex }: any) {
        if (this.form.max_level <= rowIndex) {
            return "hide";
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.levels {
    margin-top: 16px;
    .level_setting {
        margin-bottom: 16px;
    }
}
.dialog-footer {
    margin-top: 16px;
}
::v-deep .hide {
    display: none;
}
</style>
