<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <!-- 参数模组 -->
            <el-form-item :label="tableColumns.module.name" prop="module">
                <template>
                    <el-select
                        v-model="form.module"
                        filterable
                        class="select"
                        :placeholder="$t('common.pleaseChoose')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.module.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </template>
            </el-form-item>
            <!-- 参数类型 -->
            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio
                        v-for="(value, key) in tableColumns.type.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ tableColumns.type.options[key] }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.key.name" prop="key">
                <el-input
                    maxlength="30"
                    :placeholder="`${tableColumns.key.name}`"
                    v-model="form.key"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <div v-for="(value, key) in tableColumns.language.options" :key="key" :value="value">
                <el-form-item :label="value" prop="value">
                    <el-input
                        maxlength="30"
                        :placeholder="`${tableColumns[key].name}`"
                        v-model="form[key]"
                        show-word-limit
                    ></el-input>
                </el-form-item>
            </div>

            <!-- 参数语言 -->
            <!-- <el-form-item size="mini" :label="tableColumns.language.name" prop="language">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.language" />
                </div>
            </el-form-item> -->
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">{{ $t("common.delete") }}</el-button>
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ $t("common.save") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemLangProxy from "@/views/system_lang/proxy/SystemLangProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import JsonEditor from "@/components/JsonEditor/index.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        JsonEditor,
    },
})
export default class SystemLangDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow(){
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
            module: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            key: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
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
