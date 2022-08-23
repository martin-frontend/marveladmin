<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="95px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select filterable clearable v-model="form.plat_id" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :key="item"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.channel_id.name" prop="channel_id">
                <el-input type="text" v-model="form.channel_id" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.domain.name" prop="domain">
                <el-input v-model.number="form.domain" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.api_domain.name" prop="api_domain">
                <el-input v-model.number="form.api_domain" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.cdn_domain.name" prop="cdn_domain">
                <el-input v-model.number="form.cdn_domain" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    v-model="form.remark"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="danger" @click="handleDelete">{{ $t("common.delete") }}</el-button>
                <el-button
                    type="primary"
                    v-if="checkUnique(unique.game_domain_update)"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ $t("common.save") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import GameDomainProxy from "@/views/game_domain/proxy/GameDomainProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class GameDomainDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: GameDomainProxy = this.getProxy(GameDomainProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: i18n.t("common.update"),
        create: i18n.t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            plat_id: [{ required: true, message: i18n.t("common.requiredSelect"), trigger: "blur" }],
            channel_id: [{ required: true, message: i18n.t("common.requiredInput"), trigger: "blur" }],
            domain: [{ required: true, message: i18n.t("common.requiredInput"), trigger: "blur" }],
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    private handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
