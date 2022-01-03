<template>
    <el-dialog :visible.sync="myProxy.agentBonusDialogData.bShow" width="350px">
        <el-form ref="form" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.agent_bonus_rate.name" prop="agent_bonus_rate">
                <el-input
                    style="width: 120px"
                    type="number"
                    min="0"
                    step="0.001"
                    v-model="form.agent_bonus_rate"
                    @keydown.native="inputLimit"
                ></el-input>
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="myProxy.agentBonusDialogData.bShow = false">{{ $t("common.cancel") }}</el-button>
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
export default class AgentBonusDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.agentBonusDialogData.form;
    private inputLimit = inputOnlyPositive;

    private handleSave() {
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
