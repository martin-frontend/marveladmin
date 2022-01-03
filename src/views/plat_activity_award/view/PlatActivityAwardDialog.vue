<template>
    <el-dialog :title="$t('plat_activity_award.dialogTitle')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :model="form" label-width="120px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['id'].name" prop="id">{{ form.id }}</el-form-item>
            <el-form-item size="mini" :label="tableColumns['activity_name'].name" prop="activity_name">{{
                form.activity_name
            }}</el-form-item>
            <el-form-item size="mini" :label="tableColumns['activity_id'].name" prop="activity_id">{{
                form.activity_id
            }}</el-form-item>
            <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">{{
                form.user_id
            }}</el-form-item>
            <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">{{
                form.nick_name
            }}</el-form-item>
            <el-form-item
                size="mini"
                :label="tableColumns['settlement_type'].name"
                prop="settlement_type"
                v-if="form.settlement_type"
                >{{ tableColumns["settlement_type"].options[form.settlement_type] }}</el-form-item
            >
            <el-form-item size="mini" :label="tableColumns['settlement_time_at'].name" prop="settlement_time_at">{{
                form.settlement_time_at
            }}</el-form-item>
            <el-form-item
                size="mini"
                :label="tableColumns['award_type'].name"
                prop="award_type"
                v-if="form.award_type"
                >{{ tableColumns["award_type"].options[form.award_type] }}</el-form-item
            >
            <el-form-item
                size="mini"
                :label="tableColumns['award_status'].name"
                prop="award_status"
                v-if="form.award_status"
                >{{ tableColumns["award_status"].options[form.award_status] }}</el-form-item
            >
            <el-form-item size="mini" :label="tableColumns['award_content'].name" prop="award_content">{{
                form.award_content
            }}</el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handlerAward(form)" v-if="form.award_status == 11">{{
                    $t("plat_activity_award.award")
                }}</el-button>
                <el-button type="primary" size="mini" @click="myProxy.dialogData.bShow = false">{{
                    $t("common.close")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityAwardProxy from "@/views/plat_activity_award/proxy/PlatActivityAwardProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatActivityAwardDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatActivityAwardProxy = this.getProxy(PlatActivityAwardProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    private handlerAward(data: any) {
        this.$confirm(this.$t("plat_activity_award.confirmOnce"), this.$t("common.prompt"), {
            confirmButtonText: this.$t("common.determine"),
            cancelButtonText: this.$t("common.cancel"),
            type: "warning",
        })
            .then(() => {
                this.myProxy.onSendAward({ ids: JSON.stringify([data.id]) });
            })
            .catch(() => {});
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
