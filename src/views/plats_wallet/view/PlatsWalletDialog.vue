<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="110px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.to_plat_id.name" prop="to_plat_id">
                <el-select
                    style="width:100%"
                    filterable
                    clearable
                    v-model="form.to_plat_id"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(item, key) of tableColumns.to_plat_id.options"
                        :key="item"
                        :label="item"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.module.name" prop="module">
                <el-select
                    style="width:100%"
                    filterable
                    clearable
                    v-model="form.module"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(item, key) of tableColumns.module.options"
                        :key="item"
                        :label="item"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select
                    style="width:100%"
                    filterable
                    clearable
                    v-model="form.plat_id"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <template v-for="(item, key) of tableColumns.plat_id.options">
                        <el-option v-if="key != 0" :key="item" :label="item" :value="Number(key)"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isUpdate" type="danger" @click="handleDelete">{{ $t("common.delete") }}</el-button>
                <el-button type="primary" @click="handleUpdate">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";
import PlatsWalletProxy from "../proxy/PlatsWalletProxy";

@Component
export default class PlatsWalletDialog extends AbstractView {
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatsWalletProxy = this.getProxy(PlatsWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: i18n.t("common.update"),
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

    get rules() {
        return {
            plat_id: [{ required: true, message: i18n.t("common.requiredSelect"), trigger: "blur" }],
            to_plat_id: [{ required: true, message: i18n.t("common.requiredInput"), trigger: "blur" }],
            module: [{ required: true, message: i18n.t("common.requiredInput"), trigger: "blur" }],
        };
    }

    get isUpdate() {
        return this.myProxy.dialogData.status == DialogStatus.update;
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
