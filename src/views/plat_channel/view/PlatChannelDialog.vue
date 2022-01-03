<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="450px">
        <el-form ref="form" :rules="rules" :model="form" label-width="90px" v-loading="net_status.loading">
            <!--  -->
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['channel_name'].name" prop="channel_name">
                <el-input v-model="form.channel_name" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <div class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.plat_channel_update)"
                    type="danger"
                    size="mini"
                    @click="handleDelete"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatChannelProxy from "@/views/plat_channel/proxy/PlatChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class PlatChannelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatChannelProxy = this.getProxy(PlatChannelProxy);
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
            plat_id: [{ required: true, message: i18n.t("common.requiredSelect"), trigger: "change" }],
            channel_name: [{ required: true, message: i18n.t("common.requiredInput"), trigger: "change" }],
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
