<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="130px" v-loading="net_status.loading">
            <template v-if="!isCustomer">
                <el-form-item size="mini" :label="tableColumns['user_id'].name" prop="user_id">
                    <el-input
                        v-if="!isStatusUpdate"
                        v-model="form.user_id"
                        :placeholder="LangUtil('请输入')"
                    ></el-input>
                    <!-- <el-autocomplete
                        v-else
                        :placeholder="LangUtil('请输入')"
                        clearable
                        v-model="form.user_id"
                        :fetch-suggestions="userIdOptions"
                    >
                    </el-autocomplete> -->
                    <template v-else>
                        {{ form.user_id }}
                    </template>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['agent_real_name'].name" prop="agent_real_name">
                    <el-input
                        v-if="!isStatusUpdate"
                        v-model="form.agent_real_name"
                        :placeholder="LangUtil('请输入')"
                    ></el-input>
                    <el-autocomplete
                        v-else
                        :placeholder="LangUtil('请输入')"
                        clearable
                        v-model="form.agent_real_name"
                        :fetch-suggestions="agentRealNameOptions"
                    >
                    </el-autocomplete>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['remark'].name" prop="remark">
                    <el-input
                        v-model="form.remark"
                        :placeholder="LangUtil('请输入')"
                        type="textarea"
                        :rows="3"
                        show-word-limit
                        maxlength="100"
                    ></el-input>
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item size="mini" :label="tableColumns['agent_real_name'].name" prop="agent_real_name">
                    <el-select v-model="form.customer_invite_user_id" filterable :placeholder="LangUtil('请选择')">
                        <el-option
                            v-for="(value, key) in tableColumns['agent_real_name'].option_key"
                            :key="key"
                            :label="value"
                            :value="Number(key)"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['customer_user_id'].name" prop="customer_user_id">
                    {{ form.customer_user_id }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['customer_find_at'].name" prop="customer_find_at">
                    <el-date-picker
                        v-model="form.customer_find_at"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :placeholder="LangUtil('请输入')"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['customer_user_source'].name"
                    prop="customer_user_source"
                >
                    <el-autocomplete
                        :placeholder="LangUtil('请输入')"
                        clearable
                        v-model="form.customer_user_source"
                        :fetch-suggestions="customerUserSourceOptions"
                    >
                    </el-autocomplete>
                </el-form-item>
                <el-form-item
                    size="mini"
                    :label="tableColumns['customer_recharge_times'].name"
                    prop="customer_recharge_times"
                >
                    {{ form.customer_recharge_times }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['customer_created_at'].name" prop="customer_created_at">
                    {{ form.customer_created_at }}
                </el-form-item>
                <el-form-item size="mini" :label="tableColumns['customer_remark'].name" prop="customer_remark">
                    <el-input
                        v-model="form.customer_remark"
                        :placeholder="LangUtil('请输入')"
                        type="textarea"
                        :rows="3"
                        show-word-limit
                        maxlength="100"
                    ></el-input>
                </el-form-item>
            </template>

            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate && !isCustomer" type="danger" size="mini" @click="handleDelete()">{{
                    LangUtil("删除")
                }}</el-button>
                <el-button type="primary" size="mini" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">{{
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
import PlatAgentManageProxy from "@/views/plat_agent_manage/proxy/PlatAgentManageProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatAgentManageDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatAgentManageProxy = this.getProxy(PlatAgentManageProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        if (this.isStatusUpdate) return {};
        return {
            user_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            agent_real_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            remark: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    get isCustomer() {
        return this.myProxy.dialogData.isCustomer;
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

    handleDelete() {
        this.myProxy.onDelete(this.form.user_id);
    }

    userIdOptions(queryString: any, cb: any) {
        var restaurants = this.tableColumns.user_id.options;
        var results = restaurants.map(item => ({
            // @ts-ignore
            ["value"]: item.toString(),
        }));
        cb(results);
    }

    agentRealNameOptions(queryString: any, cb: any) {
        var restaurants = this.tableColumns.agent_real_name.options;
        var results = restaurants.map(item => ({
            // @ts-ignore
            ["value"]: item.toString(),
        }));
        cb(results);
    }

    customerUserSourceOptions(queryString: any, cb: any) {
        var restaurants = this.tableColumns.customer_user_source.options;
        var results = restaurants.map(item => ({
            // @ts-ignore
            ["value"]: item.toString(),
        }));
        cb(results);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.dialog-footer {
    margin-top: 16px;
}
</style>
