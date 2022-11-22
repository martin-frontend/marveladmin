<template>
    <el-dialog :title="LangUtil('更换兑换渠道')" :visible.sync="myProxy.changeDialogData.bShow" width="700px">
        <div v-loading="net_status.loading">
            <div class="info-box">
                <el-form ref="form" label-width="80px" label-position="left">
                    <el-form-item size="mini" :label="tableColumns.user_id.name" prop="name">
                        {{ form.user_id }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns.username.name" prop="name">
                        {{ form.username }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns.nick_name.name" prop="name">
                        {{ form.nick_name }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns.receive_payment_type.name" prop="name">
                        {{ tableColumns.receive_payment_type.options[form.receive_payment_type] }}
                    </el-form-item>
                </el-form>
                <el-form ref="form1" label-width="80px" label-position="left">
                    <el-form-item size="mini" :label="tableColumns.gold.name" prop="name">
                        {{ form.gold }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns.fee_rate.name" prop="name">
                        {{ form.fee_rate }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns.fee.name" prop="name">
                        {{ form.fee }}
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns.money.name" prop="name">
                        {{ form.money }}
                    </el-form-item>
                </el-form>
            </div>
            <el-divider />
            <div style="text-align:center">
                {{ LangUtil("更换") }}{{ tableColumns.exchange_channel.name }}
                <el-select
                    v-model="form.exchange_channel"
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    style="margin: 0px 10px"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_exchange_channel.options[form.plat_id][
                            form.receive_payment_type
                        ]"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
                <el-button
                    type="primary"
                    size="mini"
                    @click="handlerChange"
                    v-if="checkUnique(unique.exchange_orders_update_channel)"
                    >{{ LangUtil("确定") }}</el-button
                >
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component } from "vue-property-decorator";
import ExchangeOrdersProxy from "../proxy/ExchangeOrdersProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class ChangeDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.changeDialogData.form;

    handlerChange() {
        this.myProxy.onUpdateChannel();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.info-box {
    display: flex;
}
.el-divider--horizontal {
    margin-top: 0;
    margin-bottom: 20px;
}
</style>
