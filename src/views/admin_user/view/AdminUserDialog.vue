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
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['nick_name'].name" prop="nick_name">
                <el-input v-model="form.nick_name" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['cate'].name" prop="cate">
                <el-select
                    v-model="form.cate"
                    clearable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
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
                    :placeholder="$t('common.pleaseChoose')"
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
                    :placeholder="$t('common.pleaseChoose')"
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

            <el-form-item v-if="form.type == 8" size="mini" :label="tableColumns['channel_id'].name" prop="channel_ids">
                <el-select
                    v-model="form.channel_ids"
                    multiple
                    clearable
                    :placeholder="$t('common.pleaseChoose')"
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
                    :placeholder="$t('common.pleaseChoose')"
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
                <el-input show-password v-model="form.password" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="$t('admin_user.checkPwd')" prop="password_verify">
                <el-input
                    show-password
                    v-model="form.password_verify"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" label="">
                <span>{{ $t("admin_user.pwdRule") }}：~!@#$%^&amp;*()\-_=+{};:&lt;,.&gt;?</span>
            </el-form-item>
            <el-form-item v-if="isStatusUpdate" size="mini" :label="tableColumns['google_key'].name" prop="google_key">
                <el-input style="width: 80%" v-model="form.google_key"></el-input
                ><el-button style="margin-left: 10px" type="primary" @click="clearGoogle">{{
                    $t("admin_user.clear")
                }}</el-button>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns['status'].options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.admin_user_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    v-if="checkUnique(unique.admin_user_edit)"
                    >{{ $t("common.save") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminUserProxy from "@/views/admin_user/proxy/AdminUserProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminUserDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminUserProxy = this.getProxy(AdminUserProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private channelList = this.myProxy.channelList.list;
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
        const commonRule = {
            admin_username: [{ required: true, validator: this.validateUserName.bind(this), trigger: "blur" }],
            nick_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            cate: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            plat_ids: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            role_ids: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            channel_ids: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            status: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
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
    private validateUserName(rule: any, value: any, callback: any) {
        if (value && checkUserName(value)) {
            callback();
        } else {
            let errorCode: any = this.$t("admin_user.errorCode1");
            callback(new Error(errorCode));
        }
    }
    /**验证密码 */
    private validatePass(rule: any, value: any, callback: any) {
        const myForm = this.myProxy.dialogData.form;
        if (!myForm.admin_user_id && value === "") {
            let errorCode: any = this.$t("login.password");
            callback(new Error(errorCode));
        } else {
            if ((myForm.admin_user_id && value === "") || checkUserPassword(value)) {
                if (myForm.password_verify !== "") {
                    (this.$refs.form as any).validateField("password_verify");
                }
                callback();
            } else {
                let error: any = this.$t("admin_user.errorCode2");
                callback(new Error(error));
            }
        }
    }
    /**验证确认密码 */
    private validatePass2(rule: any, value: any, callback: any) {
        const staus = this.myProxy.dialogData.status;
        const myForm = this.myProxy.dialogData.form;
        if (staus == DialogStatus.create && value === "") {
            let error: any = this.$t("admin_user.errorCode3");
            callback(new Error(error));
        } else if (value !== myForm.password) {
            let error: any = this.$t("admin_user.errorCode4");
            callback(new Error(error));
        } else {
            callback();
        }
    }

    private clearGoogle() {
        this.form.google_key = "";
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
        this.myProxy.onDelete(this.form.admin_user_id);
    }

    // 筛选渠道
    private channelListFilter() {
        this.myProxy.channelListFilter();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
