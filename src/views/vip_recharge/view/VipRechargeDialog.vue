<template>
    <el-dialog :title="LangUtil('查询玩家')" :visible.sync="myProxy.dialogData.bShow" width="500px">
        <el-form
            label-position="right"
            ref="form"
            :rules="rules"
            :model="form"
            label-width="100px"
            v-loading="net_status.loading"
        >
            <el-form-item :label="tableColumns['plat_id'].name" prop="plat_id">
                {{ tableColumns["plat_id"].options[form.plat_id] }}
            </el-form-item>
            <el-form-item :label="tableColumns['user_id'].name" prop="user_id">
                {{ form.user_id }}
            </el-form-item>
            <el-form-item :label="tableColumns['username'].name" prop="username">
                {{ form.username }}
            </el-form-item>
            <el-form-item :label="tableColumns['nick_name'].name" prop="nick_name">
                {{ form.nick_name }}
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import VipRechargeProxy from "@/views/vip_recharge/proxy/VipRechargeProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class VipRechargeDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VipRechargeProxy = this.getProxy(VipRechargeProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {};
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
