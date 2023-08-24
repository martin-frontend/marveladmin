<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="880px">
        <el-form
            ref="form"
            :rules="rules[status]"
            :model="form"
            label-width="140px"
            :disabled="net_status.loading || !checkUnique(unique.admin_user_edit)"
            v-loading="net_status.loading"
        >
            <el-form-item size="mini" :label="tableColumns['admin_username'].name" prop="admin_username">
                <el-input
                    v-model="form.admin_username"
                    :disabled="isStatusUpdate"
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                <el-input v-model="form.nick_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['cate'].name" prop="cate">
                <el-select
                    v-model="form.cate"
                    clearable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    @change="form.type = null"
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['cate'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['type'].name" prop="type" v-show="form.cate">
                <el-select
                    v-model="form.type"
                    clearable
                    class="select"
                    :disabled="isStatusUpdate"
                    :placeholder="LangUtil('请选择')"
                    @change="form.type != 4 ? (form.role_ids = []) : null"
                >
                    <template v-if="form.cate">
                        <el-option
                            v-for="(value, key) in tableColumns['type'].options_key[form.cate]"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_ids">
                <el-select
                    v-model="form.plat_ids"
                    multiple
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                    style="width: 100%"
                    @change="channelListFilter"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['plat_id'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="form.type == 8 || form.type == 4" size="mini" :label="tableColumns['channel_id'].name" prop="channel_ids">
                <el-select
                    v-model="form.channel_ids"
                    multiple
                    clearable
                    :placeholder="LangUtil('请选择')"
                    style="width: 100%"
                >
                    <el-option
                        v-for="(value, key) in channelList"
                        :key="key"
                        :label="value.channel_id"
                        :value="value.channel_id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                size="mini"
                :label="tableColumns['role_id'].name"
                prop="role_ids"
                v-if="form.type == 4 && form.cate"
            >
                <el-select
                    v-model="form.role_ids"
                    multiple
                    clearable
                    :placeholder="LangUtil('请选择')"
                    style="width: 100%"
                >
                    <el-option
                        v-for="(value, key) in tableColumns['role_id'].options_key[form.cate]"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['password'].name" prop="password">
                <el-input show-password v-model="form.password" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="LangUtil('确认密码')" prop="password_verify">
                <el-input show-password v-model="form.password_verify" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" label="">
                <span
                    >{{
                        LangUtil(
                            "留空为不修改，8-20位字符，必须为同时包含一个大、小写字母、数字、特殊字符的组合,特殊字符为以下任何一个"
                        )
                    }}：~!@#$%^&amp;*()\-_=+{};:&lt;,.&gt;?</span
                >
            </el-form-item>
            <el-form-item v-if="isStatusUpdate" size="mini" :label="tableColumns['google_key'].name" prop="google_key">
                <el-input style="width: 80%" v-model="form.google_key"></el-input
                ><el-button style="margin-left: 10px" type="primary" @click="clearGoogle">{{
                    LangUtil("清除")
                }}</el-button>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns['status'].options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['diff_ip_login'].name" prop="diff_ip_login">
                <el-switch v-model="form.diff_ip_login" :active-value="1" :inactive-value="0"> </el-switch>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.admin_user_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    v-if="checkUnique(unique.admin_user_edit)"
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
import AdminUserProxy from "@/views/admin_user/proxy/AdminUserProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminUserDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminUserProxy = this.getProxy(AdminUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    channelList = this.myProxy.channelList.list;
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
        const commonRule = {
            admin_username: [{ required: true, validator: this.validateUserName.bind(this), trigger: "blur" }],
            nick_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            cate: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            plat_ids: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            role_ids: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            channel_ids: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            status: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
        };
        return {
            create: Object.assign(commonRule, {
                password: [{ required: true, validator: this.validatePass.bind(this), trigger: "change" }],
                password_verify: [{ required: true, validator: this.validatePass2.bind(this), trigger: "change" }],
            }),
            update: Object.assign(commonRule, {
                password: [{ required: false, validator: this.validatePass.bind(this), trigger: "change" }],
                password_verify: [{ required: false, validator: this.validatePass2.bind(this), trigger: "change" }],
            }),
        };
    }
    /**验证用户 */
    validateUserName(rule: any, value: any, callback: any) {
        if (value && checkUserName(value)) {
            callback();
        } else {
            let errorCode: any = this.LangUtil("4-20位字符，字母与数字组合");
            callback(new Error(errorCode));
        }
    }
    /**验证密码 */
    validatePass(rule: any, value: any, callback: any) {
        const myForm = this.myProxy.dialogData.form;
        if (!myForm.admin_user_id && value === "") {
            let errorCode: any = this.LangUtil("请输入密码");
            callback(new Error(errorCode));
        } else {
            if ((myForm.admin_user_id && value === "") || checkUserPassword(value)) {
                if (myForm.password_verify !== "") {
                    (this.$refs.form as any).validateField("password_verify");
                }
                callback();
            } else {
                let error: any = this.LangUtil("8-20位字符，必须为同时包含一个大、小写字母、数字、特殊字符的组合");
                callback(new Error(error));
            }
        }
    }
    /**验证确认密码 */
    validatePass2(rule: any, value: any, callback: any) {
        const staus = this.myProxy.dialogData.status;
        const myForm = this.myProxy.dialogData.form;
        if (staus == DialogStatus.create && value === "") {
            let error: any = this.LangUtil("请再次输入密码");
            callback(new Error(error));
        } else if (value !== myForm.password) {
            let error: any = this.LangUtil("两次输入密码不一致!");
            callback(new Error(error));
        } else {
            callback();
        }
    }

    clearGoogle() {
        this.form.google_key = "";
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
        this.myProxy.onDelete(this.form.admin_user_id);
    }

    // 筛选渠道
    channelListFilter() {
        this.myProxy.channelListFilter();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
