<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input v-model="form.name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['desc'].name" prop="desc">
                <el-input type="textarea" v-model="form.desc" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['type'].name" prop="type">
                <el-select v-model="form.type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['settlement_types'].name" prop="settlement_types">
                <el-checkbox-group v-model="form.settlement_types">
                    <el-checkbox
                        v-for="(value, key) in tableColumns['settlement_types'].options"
                        :key="key"
                        :label="key"
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['class'].name" prop="class">
                <el-input v-model="form.class" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['params_name'].name" prop="params_name">
                <el-input v-model="form.params_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['params_type'].name" prop="params_type">
                <el-select v-model="form.params_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns['params_type'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['weight'].name" prop="weight">
                <el-input type="number" v-model="form.weight" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <template v-if="isStatusUpdate">
                <el-form-item size="mini" :label="tableColumns['created_by'].name" prop="created_by">
                    {{ form.created_by }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['created_at'].name" prop="created_at">
                    {{ form.created_at }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['updated_by'].name" prop="updated_by">
                    {{ form.updated_by }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['updated_at'].name" prop="updated_at">
                    {{ form.updated_at }}
                </el-form-item>
            </template>
            <el-form-item class="dialog-footer">
                <!-- <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete(form)">删除</el-button> -->
                <el-button
                    v-if="checkUnique(unique.plat_activity_rule_update)"
                    type="primary"
                    size="mini"
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
import PlatActivityRuleProxy from "@/views/plat_activity_rule/proxy/PlatActivityRuleProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatActivityRuleDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityRuleProxy = this.getProxy(PlatActivityRuleProxy);
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

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            settlement_types: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            class: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            params_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            params_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            weight: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            created_by: [{ required: false }],
            created_at: [{ required: false }],
            updated_by: [{ required: false }],
            updated_at: [{ required: false }],
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
