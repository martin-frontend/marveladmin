<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <!-- 参数类型 -->
            <el-form-item :label="tableColumns.type.name" prop="type">
                <template v-if="!isStatusUpdate">
                    <el-select v-model="form.type" filterable class="select" :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns.type.options"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </template>
                <span v-else>
                    {{ tableColumns.type.options[form.type] }}
                </span>
            </el-form-item>

            <el-form-item :label="tableColumns.key.name" prop="key">
                <el-input :placeholder="`${tableColumns.key.name}`" v-model="form.key"></el-input>
            </el-form-item>

            <div v-for="(value, key) in tableColumns.language.options" :key="key" :value="value" class="flex d-flex">
                <el-checkbox class="mt-10" v-model="check[key]"></el-checkbox>
                <el-form-item :label="value" prop="value" class="ml-5 wid-100">
                    <div class="flex d-flex ml-n19">
                        <el-input
                            style="margin-right: 0.8rem"
                            type="textarea"
                            filterable
                            clearable
                            :placeholder="`${tableColumns[key].name}`"
                            v-model="form[key]"
                        ></el-input>
                        <el-button
                            style="max-height: 35px"
                            type="primary"
                            size="mini"
                            @click="handleTranslate(key, form[key])"
                            >一键翻译成其他语言</el-button
                        >
                    </div>
                    <div>
                        <el-checkbox-group v-model="form.config[key]">
                            <el-checkbox
                                v-for="(value, key) in tableColumns.language.options"
                                :key="key"
                                :label="key"
                            >{{ value }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
            </div>

            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">{{
                    LangUtil("删除")
                }}</el-button>
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    check = this.myProxy.dialogData.check;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
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
            module: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            key: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            plat_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    handleTranslate(source: string, sentence: string) {
        this.myProxy.translate({ source: source, sentence: sentence, id: this.form.id });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-form-item__label {
    width: 110px !important;
    text-align: left;
}
.wid-100 {
    width: 100%;
}
.ml-n19 {
    margin-left: -19px !important;
}
.mt-10 {
    margin-top: 10px;
}
.ml-5 {
    padding-left: 5px;
}
</style>
