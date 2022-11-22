<template>
    <el-dialog :title="LangUtil('整盘分红金额')" :visible.sync="myProxy.dividendDialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                {{ tableColumns["plat_id"].options[form.plat_id] }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['type'].name" prop="type">
                <el-radio v-model="form.type" label="1">{{ LangUtil("手动输入") }}</el-radio>
                <el-radio v-model="form.type" label="2">{{ LangUtil("百分比自动") }}</el-radio>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('输入分红金额')" prop="bonus_all_gold" v-if="form.type === '1'">
                <el-input
                    v-model="form.bonus_all_gold"
                    type="text"
                    onkeyup="this.value= this.value.match(/\d+(\.\d{0,3})?/) ? this.value.match(/\d+(\.\d{0,3})?/)[0] : ''"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('输入百分比%')" prop="auto_rate" v-else>
                <el-input v-model="form.auto_rate" type="text" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                <p class="red">{{ LangUtil("根据结算周期输赢统计百分比进行分红") }}</p>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">{{ LangUtil("确定") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBonusAllProxy from "@/views/plat_bonus_all/proxy/PlatBonusAllProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class DialogDividend extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatBonusAllProxy = this.getProxy(PlatBonusAllProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dividendDialogData.form;

    @Watch("myProxy.dividendDialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            bonus_all_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            auto_rate: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.admin_plat_bonus_all_stock_set_update();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.red {
    color: red;
    margin: 0;
}
</style>
