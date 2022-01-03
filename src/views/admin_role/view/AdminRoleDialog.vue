<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="115px"
            v-loading="net_status.loading"
            :disabled="!checkUnique(unique.admin_role_edit)"
        >
            <el-form-item size="mini" :label="tableColumns['name'].name" prop="name">
                <el-input
                    v-model="form.name"
                    maxlength="30"
                    show-word-limit
                    clearable
                    :placeholder="$t('common.pleaseEnter')"
                >
                </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['desc'].name" prop="desc">
                <el-input
                    type="textarea"
                    v-model="form.desc"
                    maxlength="100"
                    show-word-limit
                    clearable
                    :placeholder="$t('common.pleaseEnter')"
                >
                </el-input>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['plat_id'].name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable clearable class="select" placeholder="请选择">
                    <el-option
                        v-for="(value, key) in tableColumns['plat_id'].options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns['status'].options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <div>
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.admin_role_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    v-if="checkUnique(unique.admin_role_edit)"
                    >{{ $t("common.save") }}</el-button
                >
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminRoleProxy from "@/views/admin_role/proxy/AdminRoleProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminRoleDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminRoleProxy = this.getProxy(AdminRoleProxy);
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
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            plat_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            status: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
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
        this.myProxy.onDelete(this.form.role_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
