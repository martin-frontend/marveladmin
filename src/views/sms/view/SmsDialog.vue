<template>
    <el-dialog :title="`${textMap[status]}` + $t('sms.title')" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.name.name" prop="name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.name"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item :label="tableColumns.area_code.name" prop="area_code">
                <el-input
                    class="area_code"
                    type="number"
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.area_code"
                    oninput="if(value.length > 5) value=value.slice(0,5);value=value.replace(/[^\d]/g,'');"
                ></el-input>
            </el-form-item> -->
            <el-form-item :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.proxy_status.name" prop="proxy_status">
                <el-switch v-model="form.proxy_status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-form-item :label="tableColumns.extends.name">
                <div class="editor-container">
                    <JsonEditor v-model="form.extends" />
                </div>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate && checkUnique(unique.sms_delete)" type="danger" size="mini" @click="handleDelete(form)">{{
                    $t("common.delete")
                }}</el-button>
                <el-button type="primary" v-if="checkUnique(unique.sms_update)" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import SmsProxy from "@/views/sms/proxy/SmsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { unique, checkUnique } from "@/core/global/Permission";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class SmsDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SmsProxy = this.getProxy(SmsProxy);
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
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            // area_code: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
        this.myProxy.onDelete(this.form.sms_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
// .area_code {
//     width: 120px;
// }
</style>
