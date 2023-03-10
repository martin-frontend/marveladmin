<template>
    <el-dialog :title="textMap[status]" width="900px" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="LangUtil('内容语言')" prop="language">
                <el-select v-model="form.language" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.language.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('支持语言')" prop="config">
                <el-checkbox-group v-model="form.config[form.language]">
                    <el-checkbox v-for="(value, key) in tableColumns.language.options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="myProxy.dialogData.bShow">
                <template v-for="(value, key) in tableColumns.language.options">
                    <TinymceUpload :key="key" v-model="form[key]" v-if="form.language == key" />
                </template>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import CommonLangTinymceProxy from "../proxy/CommonLangTinymceProxy";
import CommonLangTinymceMediator from "../mediator/CommonLangTinymceMediator";
import TinymceUpload from "@/components/TinymceUpload/index.vue";

@Component({
    components: {
        TinymceUpload,
    },
})
export default class CommonLangTinymceDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CommonLangTinymceProxy = this.getProxy(CommonLangTinymceProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

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

    constructor() {
        super(CommonLangTinymceMediator);
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            language: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            config: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
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
                console.log("handleUpdate");
                this.myProxy.onUpdate();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
