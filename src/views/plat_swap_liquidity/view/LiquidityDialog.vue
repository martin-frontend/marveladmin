<template>
    <el-dialog :title="title[form.type]" :visible.sync="myProxy.dialogLiquidity.bShow" width="700px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="name">
                <span>{{ tableColumns.plat_id.options[source.plat_id] }}</span>
            </el-form-item>

            <el-form-item size="mini" label="交易对">
                <span>{{ source.coin_a }} / {{ source.coin_b }}</span>
            </el-form-item>

            <div v-if="source.coin_a_amount == 0 && source.coin_b_amount == 0">
                <el-form-item :label="`${source.coin_a}数量`" prop="change_coin_a_amount">
                    <el-input
                        v-model="form.change_coin_a_amount"
                        onkeyup="this.value=(this.value.match(/\d+(.\d{0,2})?/)||[''])[0]"
                    ></el-input>
                    <p>
                        <!-- 输入数字，最多保留2位小数 -->
                        {{ LangUtil("输入数字，最多保留2位小数") }}
                    </p>
                </el-form-item>
                <el-form-item :label="`${source.coin_b}数量`" prop="change_coin_b_amount">
                    <el-input
                        v-model="form.change_coin_b_amount"
                        onkeyup="this.value=(this.value.match(/\d+(.\d{0,2})?/)||[''])[0]"
                    ></el-input>
                    <p>
                        <!-- 输入数字，最多保留2位小数 -->
                        {{ LangUtil("输入数字，最多保留2位小数") }}
                    </p>
                </el-form-item>
            </div>
            <el-form-item v-else :label="`${source.coin_a}数量`" prop="change_coin_a_amount">
                <el-input
                    v-model="form.change_coin_a_amount"
                    onkeyup="this.value=(this.value.match(/\d+(.\d{0,2})?/)||[''])[0]"
                ></el-input>
                <p>
                    <!-- 输入数字，最多保留2位小数 -->
                    {{ LangUtil("输入数字，最多保留2位小数") }}
                </p>
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
import i18n from "@/lang";

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
    form = this.myProxy.dialogLiquidity.form;
    source = this.myProxy.dialogLiquidity.source;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    title = {
        1: LangUtil("添加流动性"),
        2: LangUtil("减少流动性"),
    };

    get rules() {
        return {
            change_coin_a_amount: [{ required: true, trigger: "blur", message: LangUtil("必须填写") }],
            change_coin_b_amount: [{ required: true, trigger: "blur", message: LangUtil("必须填写") }],
        };
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onLiquidity();
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
</style>
