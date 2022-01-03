<template>
    <el-dialog
        :title="$t('exchange_orders.changeChannelTitle')"
        :visible.sync="myProxy.changeDialogData.bShow"
        width="700px"
    >
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
                {{ $t("exchange_orders.changeText") }}{{ tableColumns.exchange_channel.name }}
                <el-select
                    v-model="form.exchange_channel"
                    filterable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
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
                    >{{ $t("common.determine") }}</el-button
                >
            </div>
        </div>
    </el-dialog>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Component } from "vue-property-decorator";
import ExchangeOrdersProxy from "../proxy/ExchangeOrdersProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class ChangeDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: ExchangeOrdersProxy = this.getProxy(ExchangeOrdersProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.changeDialogData.form;

    private handlerChange() {
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
