<template>
    <el-dialog width="700px" :title="LangUtil('新增信用用户')" :visible.sync="myProxy.creditUserDialogData.bShow">
        <el-form :rules="rules" ref="form" :model="form" label-width="145px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.username.name" prop="username">
                <el-input
                    prefix-icon="el-icon-user"
                    v-model="form.username"
                    placeholder="Username"
                    name="username"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                />
            </el-form-item>
            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item size="mini" :label="tableColumns.password.name" prop="password">
                    <el-input
                        prefix-icon="el-icon-lock"
                        v-model="form.password"
                        placeholder="Password"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        @keyup.native="checkCapslock"
                        @blur="capsTooltip = false"
                        show-password
                    />
                </el-form-item>
            </el-tooltip>
            <el-form-item size="mini" :label="tableColumns.credit_rate_min.name" prop="credit_rate_min">
                <el-input v-model="form.credit_rate_min"><template slot="append">%</template></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.credit_rate_max.name" prop="credit_rate_max">
                <el-input v-model="form.credit_rate_max"><template slot="append">%</template></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.water_config.name">
                <div class="water-config" v-for="(name, key) in tableColumns.vendor_type.options" :key="key">
                    <span>{{ name }}</span>
                    <span> {{ LangUtil("系统最大") }} {{ (dialogData.backwater_config[key] || 0) * 100 }} % </span>
                    <span>
                        <el-input size="mini" v-model="form.water_config[key]" controls-position="right">
                            <template slot="append">%</template>
                        </el-input>
                    </span>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['show_credit_report'].name" prop="show_credit_report">
                <el-switch v-model="form.show_credit_report" :active-value="1" :inactive-value="98"></el-switch>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleAdd">{{ LangUtil("确定") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatCreditUserDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.creditUserDialogData.form;
    capsTooltip = false;
    dialogData = this.myProxy.creditUserDialogData;

    checkCapslock(e: any) {
        const { key } = e;
        this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    }

    rules = {
        username: [{ required: true, message: this.LangUtil("未填写"), trigger: "blur" }],
        password: [{ required: true, message: this.LangUtil("未填写"), trigger: "blur" }],
        credit_rate_min: [{ required: true, message: this.LangUtil("未填写"), trigger: "blur" }],
        credit_rate_max: [{ required: true, message: this.LangUtil("未填写"), trigger: "blur" }],
    };

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAddCreditUser();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.water-config {
    margin-bottom: 16px;
    display: flex;
    span {
        flex: 1;
    }
    span:last-child {
        flex: 2;
    }
}
</style>
