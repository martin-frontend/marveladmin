<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="95px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select filterable clearable v-model="form.plat_id" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.plat_id.options"
                        :key="item"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.channel_id.name" prop="channel_id">
                <el-input type="text" v-model="form.channel_id" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.domain.name" prop="domain">
                <el-input v-model.number="form.domain" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.api_domain.name" prop="api_domain">
                <el-input v-model.number="form.api_domain" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.cdn_domain.name" prop="cdn_domain">
                <el-input v-model.number="form.cdn_domain" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item :label="tableColumns.remark.name" prop="remark">
                <el-input
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    v-model="form.remark"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="danger" @click="handleDelete">{{ LangUtil("删除") }}</el-button>
                <el-button
                    type="primary"
                    v-if="checkUnique(unique.game_domain_update)"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: GameDomainProxy = this.getProxy(GameDomainProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
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
            plat_id: [{ required: true, message: LangUtil("必须选择"), trigger: "blur" }],
            channel_id: [{ required: true, message: LangUtil("必须填写"), trigger: "blur" }],
            domain: [{ required: true, message: LangUtil("必须填写"), trigger: "blur" }],
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
