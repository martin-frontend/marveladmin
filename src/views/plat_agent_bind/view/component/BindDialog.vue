<template>
    <el-dialog :title="$t('plat_agent_bind.boundSuperior')" :visible.sync="myProxy.bindDialogData.bShow" width="650px">
        <el-form ref="form" :rules="rules" :model="form" label-width="210px" v-loading="net_status.loading">
            <!-- 用户ID -->
            <el-form-item :label="tableColumns.user_id.name">
                {{ form.user_id }}
            </el-form-item>
            <!-- 用户昵称 -->
            <el-form-item :label="tableColumns.nick_name.name"> {{ form.nick_name }} </el-form-item>
            <!-- 当前绑定上级 -->
            <el-form-item :label="$t('plat_agent_bind.currentBoundSuperior')"> {{ form.invite }} </el-form-item>
            <!-- 设置绑定上级 -->
            <el-form-item :label="$t('plat_agent_bind.setUpBindingSuperior')" prop="invite_user_id">
                <el-input v-model.trim="form.invite_user_id"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="myProxy.bindDialogData.bShow = false">{{ $t("common.cancel") }}</el-button>
                <el-button type="primary" @click="handleAdd()">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatAgentBindProxy from "@/views/plat_agent_bind/proxy/PlatAgentBindProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class PlatAgentBindDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentBindProxy = this.getProxy(PlatAgentBindProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.bindDialogData.form;

    @Watch("myProxy.bindDialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            invite_user_id: { required: true, message: i18n.t("common.requiredInput"), trigger: "blur" },
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onBind();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-form-item {
    margin-bottom: 10px;
}
</style>
