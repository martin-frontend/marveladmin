<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="500px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" label-position="left" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id" label-width="100px">
                <el-select
                    style="width:100%"
                    v-model="form.plat_id"
                    filterable
                    clearable
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option v-for="(value, key) in tableColumns.plat_id.options" :key="key" :label="value" :value="Number(key)"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label-width="0" prop="name">
                <el-input
                    style="width: 100%"
                    :value="``"
                    :placeholder="$t('common.questionTitle')"
                    v-model="form.name"
                    maxlength="200"
                    clearable
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="content">
                <el-input
                    maxlength="2000"
                    :rows="6"
                    type="textarea"
                    filterable
                    clearable
                    class="select"
                    :placeholder="$t('common.questionContent')"
                    v-model="form.content"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete()">{{ $t("common.delete") }}</el-button>
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatServiceProxy from "@/views/plat_service/proxy/PlatServiceProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatServiceDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatServiceProxy = this.getProxy(PlatServiceProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
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
            plat_id:[{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            content: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
