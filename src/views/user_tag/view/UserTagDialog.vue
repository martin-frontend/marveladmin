<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="700px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select
                    :disabled="isStatusUpdate"
                    v-model="form.plat_id"
                    filterable
                    clearable
                    class="select"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="(value, key) in platIdOptions"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input
                    v-model="form.name"
                    maxlength="30"
                    show-word-limit
                    clearable
                    :placeholder="LangUtil('请输入')"
                    :disabled="isStatusUpdate"
                >
                </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['remark'].name" prop="remark">
                <el-input
                    v-model="form.remark"
                    maxlength="30"
                    show-word-limit
                    clearable
                    :placeholder="LangUtil('请输入')"
                    :disabled="form.plat_id==0"
                >
                </el-input>
            </el-form-item>
            <el-form-item
                v-if="isStatusUpdate"
                size="mini"
                :label="tableColumns['tag_users_num'].name"
                prop="tag_users_num"
            >
                <el-input v-model="form.tag_users_num" disabled style="width: auto; margin-right: 12px;"> </el-input>
                <el-button type="primary" size="mini" plain @click="showUsers">
                    {{ LangUtil("用户列表") }}
                </el-button>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button v-if="form.plat_id != 0" type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">
                    {{ LangUtil("确认保存") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import UserTagProxy from "../proxy/UserTagProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class UserTagDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: UserTagProxy = this.getProxy(UserTagProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    private textMap = {
        update: LangUtil("详情"),
        create: LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get platIdOptions() {
        return this.myProxy.dialogData.status == 'update' ?
            this.myProxy.tableData.columns.plat_id.options :
            this.myProxy.platIdOptions
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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

    showUsers() {
        this.myProxy.showUsersDialog(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
