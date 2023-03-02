<template>
    <el-dialog :title="LangUtil('编辑')" :visible.sync="dialogData.bShow" width="600px" :append-to-body="true">
        <div v-loading="net_status.loading">
            <template v-if="dialogData.filed == 'credit_rate_invited'">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item :label="tableColumns.user_id.name">{{ form.user_id }} </el-form-item>
                    <el-form-item :label="tableColumns.username.name">{{ form.username }} </el-form-item>
                    <el-form-item :label="tableColumns.nick_name.name">{{ form.nick_name }} </el-form-item>
                    <el-form-item :label="tableColumns.credit_rate_invited.name">
                        <el-input v-model="form.credit_rate_invited">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="tableColumns.credit_rate.name">
                        <el-input v-model="form.credit_rate">
                            <template slot="append">%</template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div style="text-align: right">
                    <span style="margin: 0 5px">
                        {{ LangUtil("最小占成") }}
                        <span style="color: red">
                            {{ userInfo.credit_rate_min }}
                        </span>
                    </span>
                    <span style="margin: 0 5px">
                        {{ LangUtil("最大占成") }}
                        <span style="color: red">
                            {{ userInfo.credit_rate_max }}
                        </span>
                    </span>
                </div>
            </template>

            <template v-else>
                <div class="input_title">{{ LangUtil("请输入") }}</div>
                <el-input class="dialog_input" v-model="dialogData.filedValue"></el-input>
            </template>
            <div class="confirm">
                <el-button class="item" type="primary" @click="handlerSubmit"> {{ LangUtil("确认保存") }} </el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
import TabCreditProxy from "../proxy/TabCreditProxy";
import { Message } from "element-ui";

@Component
export default class EditDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabCreditProxy = getProxy(TabCreditProxy);
    tableColumns: any = this.myProxy.tableColumns;
    dialogData = this.myProxy.dialogData;
    form = this.myProxy.dialogData.form;
    userInfo = this.myProxy.userInfo;

    handlerSubmit() {
        this.myProxy.onEdit(this.dialogData.filed, this.dialogData.filedValue);
    }
}
</script>

<style scoped lang="scss">
.input_title {
    margin-bottom: 20px;
    margin-left: 25px;
}
.dialog_input {
    width: 400px;
    margin-bottom: 10px;
    margin-left: 25px;
}
.confirm {
    text-align: center;
    margin-top: 30px;
}
.ps {
    color: red;
}
</style>
