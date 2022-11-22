<template>
    <el-dialog title="编辑" :visible.sync="myProxy.dialogSetting.bShow" width="900px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="name">
                <span>{{ tableColumns.plat_id.options[source.plat_id] }}</span>
            </el-form-item>

            <el-form-item size="mini" label="交易对">
                <span>{{ source.coin_a }} / {{ source.coin_b }}</span>
            </el-form-item>

            <el-form-item size="mini" label="费率" prop="swap_fee_ratio">
                <el-row>
                    <el-col :span="6" class="d-flex">
                        <el-input
                            v-model="form.swap_fee_ratio"
                            onkeyup="this.value=(this.value.match(/\d+(.\d{0,6})?/)||[''])[0]"
                        ></el-input>
                        %
                    </el-col>
                </el-row>

                <p>输入0-20数字，最多保留6位小数</p>
            </el-form-item>

            <el-form-item size="mini" label="容差" prop="tolerance_params">
                <el-row>
                    <el-col :span="6" class="d-flex">
                        <el-input
                            v-model="form.tolerance_params[0]"
                            onkeyup="this.value=(this.value.match(/\d+(.\d{0,6})?/)||[''])[0]"
                        ></el-input>
                        %
                    </el-col>
                    <el-col :span="6" class="d-flex">
                        <el-input
                            v-model="form.tolerance_params[1]"
                            onkeyup="this.value=(this.value.match(/\d+(.\d{0,6})?/)||[''])[0]"
                        ></el-input
                        >%
                    </el-col>
                    <el-col :span="6" class="d-flex">
                        <el-input
                            v-model="form.tolerance_params[2]"
                            onkeyup="this.value=(this.value.match(/\d+(.\d{0,6})?/)||[''])[0]"
                        ></el-input>
                        %
                    </el-col>
                    <el-col :span="6" class="d-flex">
                        <el-input
                            v-model="form.tolerance_params[3]"
                            onkeyup="this.value=(this.value.match(/\d+(.\d{0,6})?/)||[''])[0]"
                        ></el-input>
                        %
                    </el-col>
                </el-row>

                <p>输入0-50数字，最多保留6位小数</p>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.status.name">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleUpdate">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatSwapLiquidityProxy from "@/views/plat_swap_liquidity/proxy/PlatSwapLiquidityProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatSwapLiquidityDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatSwapLiquidityProxy = this.getProxy(PlatSwapLiquidityProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogSetting.form;
    source = this.myProxy.dialogSetting.source;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    validateToleranceParams(rule: any, value: any, callback: any) {
        console.log(value);
        let result = false;
        for (const val of value) {
            if (!val) {
                result = true;
            }
        }
        if (result) {
            callback(new Error("必须填写确实"));
        } else {
            callback();
        }
    }

    get rules() {
        return {
            swap_fee_ratio: [{ required: true, trigger: "blur", message: "必须填写" }],
            tolerance_params: [{ validator: this.validateToleranceParams, trigger: "blur" }],
        };
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onSetting();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
p {
    margin: 0;
    color: red;
}
.d-flex {
    display: flex;
    padding-right: 6px;
}
</style>
