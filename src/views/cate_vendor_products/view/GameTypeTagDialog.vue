<template>
    <el-dialog width="700px" :title="textMap[status]" :visible.sync="myProxy.gameTypeDialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <span>{{ tableColumns.plat_id.options[form.plat_id] }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.game_type.name" prop="game_type">
                <el-select v-model="form.game_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.game_type.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns['name'].name" prop="name">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.name"
                        maxlength="200"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.name)"
                        >{{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns['icon_name'].name" prop="icon_name">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.icon_name"
                        maxlength="200"
                    ></el-input>
                </div>
            </el-form-item>
            <el-form-item :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <!-- <el-button type="danger" @click="handleDelete()" v-if="isStatusUpdate">{{
                    LangUtil("删除")
                }}</el-button> -->
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CateVendorProductsProxy from "../proxy/CateVendorProductsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class GameTypeTagDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
    // proxy property
    tableColumns = this.myProxy.gameTypeTableData.columns;
    form = this.myProxy.gameTypeDialogData.form;
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);

    private textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.gameTypeDialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {};
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onGameTypeAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onGameTypeUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onGameTypeDelete(this.form.id);
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_VENDER_GAME_LANGUAGE;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
