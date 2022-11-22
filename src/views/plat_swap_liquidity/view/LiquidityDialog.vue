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
                        {{ $t("user_detail.maxLengthPoint2") }}
                    </p>
                </el-form-item>
                <el-form-item :label="`${source.coin_b}数量`" prop="change_coin_b_amount">
                    <el-input
                        v-model="form.change_coin_b_amount"
                        onkeyup="this.value=(this.value.match(/\d+(.\d{0,2})?/)||[''])[0]"
                    ></el-input>
                    <p>
                        <!-- 输入数字，最多保留2位小数 -->
                        {{ $t("user_detail.maxLengthPoint2") }}
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
                    {{ $t("user_detail.maxLengthPoint2") }}
                </p>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleUpdate">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
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
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatSwapLiquidityProxy = this.getProxy(PlatSwapLiquidityProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogLiquidity.form;
    private source = this.myProxy.dialogLiquidity.source;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    private title = {
        1: i18n.t("user_detail.addLiquidity"),
        2: i18n.t("user_detail.reduceLiquidity"),
    };

    get rules() {
        return {
            change_coin_a_amount: [{ required: true, trigger: "blur", message: i18n.t("common.requiredInput") }],
            change_coin_b_amount: [{ required: true, trigger: "blur", message: i18n.t("common.requiredInput") }],
        };
    }

    private handleUpdate() {
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
