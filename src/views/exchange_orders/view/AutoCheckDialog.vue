<template>
    <el-dialog :title="textMap" :visible.sync="myProxy.autoCheckDialog.bShow" width="570px">
        <div v-loading="net_status.loading">
            <div class="info-box">
                <el-form
                    ref="form"
                    :rules="rules"
                    :label-width="width"
                    label-position="right"
                    v-loading="net_status.loading"
                    :model="form"
                >
                    <!-- 平台 -->
                    <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="plat_id">
                        <el-select filterable v-model="form.plat_id" disabled :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(item, key) of tableColumns.plat_id.options"
                                :key="item"
                                :label="item"
                                :value="key"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 审核总额 -->
                    <div class="tooltip-box">
                        <el-tooltip placement="top-start">
                            <div slot="content">{{ LangUtil("审核总额，既能审核的提现金额总和；") }}</div>
                            <i class="el-icon-question" />
                        </el-tooltip>
                        <el-form-item size="mini" :label="tableColumns.total_gold.name" prop="total_gold">
                            <el-input v-model="form.total_gold" :disabled="isVerify"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 单笔金额 -->
                    <div class="tooltip-box">
                        <el-tooltip placement="top-start">
                            <div slot="content">{{ LangUtil("订单超过单笔金额直接跳过；不自动审核；") }}</div>
                            <i class="el-icon-question" />
                        </el-tooltip>
                        <el-form-item size="mini" :label="tableColumns.single_gold.name" prop="single_gold">
                            <el-input v-model="form.single_gold" :disabled="isVerify"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 停止金额  -->
                    <div class="tooltip-box">
                        <el-tooltip placement="top-start">
                            <div slot="content">{{ LangUtil("当审核总额剩余改金额度自动停止自动审核；") }}</div>
                            <i class="el-icon-question" />
                        </el-tooltip>
                        <el-form-item size="mini" :label="tableColumns.stop_gold.name" prop="stop_gold">
                            <el-input v-model="form.stop_gold" :disabled="isVerify"></el-input>
                        </el-form-item>
                    </div>
                    <!-- 输赢核对  -->
                    <el-form-item size="mini" :label="tableColumns.check_win_loss.name" prop="check_win_loss">
                        <el-radio v-model="form.check_win_loss" :disabled="isVerify" :label="1">{{
                            LangUtil("是")
                        }}</el-radio>
                        <el-radio v-model="form.check_win_loss" :disabled="isVerify" :label="98">{{
                            LangUtil("否")
                        }}</el-radio>
                    </el-form-item>
                    <!-- 相同创建IP  -->
                    <el-form-item size="mini" :label="tableColumns.register_ip_num.name" prop="register_ip_num">
                        <el-input v-model="form.register_ip_num" :disabled="isVerify"></el-input>
                    </el-form-item>
                    <!-- 相同【登陆】IP数量  -->
                    <el-form-item size="mini" :label="tableColumns.login_ip_num.name" prop="login_ip_num">
                        <el-input v-model="form.login_ip_num" :disabled="isVerify"></el-input>
                    </el-form-item>

                    <!-- info -->
                    <div class="info" v-if="!isAutoCheckSetting">
                        <el-form-item size="mini" :label="LangUtil('审核成功')">
                            {{ form.checked_success }}
                        </el-form-item>
                        <el-form-item size="mini" :label="LangUtil('审核失败')">
                            {{ form.checked_fail }}
                        </el-form-item>
                        <el-form-item size="mini" :label="LangUtil('审核总额')">
                            {{ form.checked_gold }} / {{ form.total_gold - form.checked_gold }}
                        </el-form-item>
                    </div>
                    <div v-if="isVerify" class="btn-group">
                        <el-button type="danger" size="mini" @click="handlerStop">{{ LangUtil("停止审核") }}</el-button>
                        <el-button size="mini" @click="myProxy.autoCheckDialog.bShow = false">{{
                            LangUtil("关闭")
                        }}</el-button>
                    </div>
                    <div v-else class="btn-group">
                        <el-button type="primary" size="mini" @click="handlerAction">{{
                            LangUtil("开始审核")
                        }}</el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Watch, Vue } from "vue-property-decorator";
import ExchangeAutoCheckProxy from "../proxy/ExchangeAutoCheckProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { warn } from "node_modules/vue-class-component/lib/util";
import Cookies from "js-cookie";

@Component
export default class AutoCheckDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeAutoCheckProxy = this.getProxy(ExchangeAutoCheckProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form1 = this.myProxy.autoCheckDialog.form;

    get form() {
        return this.myProxy.autoCheckDialog.form;
    }

    @Watch("myProxy.autoCheckDialog.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get isVerify() {
        return this.form1.status == 1 ? true : false;
    }

    get textMap() {
        return this.isVerify ? this.LangUtil("审核中...") : this.LangUtil("自动审核");
    }

    // 没有设定过自动审核过的不显示info 栏位
    get isAutoCheckSetting() {
        return this.form1.status === null ? true : false;
    }

    get width() {
        let _w = "";
        if (Cookies.get("language") === "zh") {
            _w = "110px";
        } else if (Cookies.get("language") === "vi") {
            _w = "160px";
        }
        return _w;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: ["change"] }],
            total_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            single_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            stop_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            check_win_loss: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            register_ip_num: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            login_ip_num: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handlerAction() {
        console.log(1, this.myProxy.autoCheckDialog.form);

        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.actionAutoCheck();
            }
        });
    }

    // 停止审核
    handlerStop() {
        //
        this.myProxy.stopVerify();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.tooltip-box {
    position: relative;
    ::v-deep .el-tooltip {
        position: absolute;
        left: 0px;
        top: 7px;
    }
}
.btn-group {
    display: flex;
    justify-content: flex-end;
}
</style>
