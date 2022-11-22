<template>
    <el-dialog :title="LangUtil('平台币商代付')" :visible.sync="myProxy.dispatchDialogData.bShow" width="500px">
        <div v-loading="net_status.loading">
            <el-form
                ref="form"
                :rules="rules"
                label-width="100px"
                v-loading="net_status.loading"
                :model="form"
                class="form"
            >
                <el-form-item :label="tableColumns.coin_username.name" prop="type">
                    <el-radio-group v-model="form.type" @change="onChange">
                        <el-radio v-for="(value, key) in type" :key="key" :label="Number(key)">
                            {{ value }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.type == 2" :label="tableColumns.coin_user_id.name" prop="coin_user_id">
                    <el-select
                        class="select"
                        v-model="form.coin_user_id"
                        filterable
                        clearable
                        :placeholder="LangUtil('请选择')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.coin_user_id.options[form.plat_id]"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="dialog-footer">
                    <el-button @click="myProxy.hideDispatchDialog()">
                        {{ LangUtil("取消") }}
                    </el-button>
                    <el-button type="primary" @click="handleUpdate">
                        {{ LangUtil("确定") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue } from "vue-property-decorator";
import ExchangeOrdersProxy from "../../proxy/ExchangeOrdersProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { DialogStatus } from "@/core/global/Constant";
import i18n from "@/lang";

@Component
export default class DispatchDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dispatchDialogData.form;
    listQuery = this.myProxy.listQuery;

    get rules() {
        return {
            coin_user_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
        };
    }

    type = {
        1: i18n.t(`exchange_orders.coin_random`),
        2: i18n.t(`exchange_orders.coin_assigned`),
    };

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onDispatch();
            }
        });
    }

    onChange() {
        if (this.form.type == 1) {
            this.form.coin_user_id = "";
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
