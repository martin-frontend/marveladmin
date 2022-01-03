<template>
    <el-dialog :title="`订单操作`" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.order_no.name" prop="order_no">
                {{ form.order_no }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.receive_payment_type.name" prop="receive_payment_type">
                {{ tableColumns.receive_payment_type.options[form.receive_payment_type] }}
            </el-form-item>
            <el-form-item
                size="mini"
                :label="tableColumns.payment_method.options[form.receive_payment_type].bank"
                prop="payment_method"
            >
                <div class="copy_group">
                    {{ form.payment_method.bank }}
                    <el-button
                        type="text"
                        :id="`bank`"
                        :data-clipboard-text="form.payment_method.bank"
                        icon="el-icon-copy-document"
                        @click="onCopy(`bank`)"
                    ></el-button>
                </div>
            </el-form-item>
            <el-form-item
                size="mini"
                :label="tableColumns.payment_method.options[form.receive_payment_type].account"
                prop="payment_method"
            >
                <div class="copy_group">
                    {{ form.payment_method.account }}
                    <el-button
                        type="text"
                        :id="`account`"
                        :data-clipboard-text="form.payment_method.account"
                        icon="el-icon-copy-document"
                        @click="onCopy(`account`)"
                    ></el-button>
                </div>
            </el-form-item>
            <el-form-item
                size="mini"
                :label="tableColumns.payment_method.options[form.receive_payment_type].account_name"
                prop="payment_method"
            >
                <div class="copy_group">
                    {{ form.payment_method.account_name }}
                    <el-button
                        type="text"
                        :id="`account_name`"
                        :data-clipboard-text="form.payment_method.account_name"
                        icon="el-icon-copy-document"
                        @click="onCopy(`account_name`)"
                    ></el-button>
                </div>
            </el-form-item>
            <el-form-item
                size="mini"
                :label="tableColumns.payment_method.options[form.receive_payment_type].account_bank"
                prop="payment_method"
            >
                <div class="copy_group">
                    {{ form.payment_method.account_bank }}
                    <el-button
                        type="text"
                        :id="`account_bank`"
                        :data-clipboard-text="form.payment_method.account_bank"
                        icon="el-icon-copy-document"
                        @click="onCopy(`account_bank`)"
                    ></el-button>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.money.name" prop="money">
                <div class="copy_group">
                    {{ form.money }}
                    <el-button
                        type="text"
                        :id="`money`"
                        :data-clipboard-text="form.money"
                        icon="el-icon-copy-document"
                        @click="onCopy(`money`)"
                    ></el-button>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.remark.name" prop="remark">
                <el-input show-word-limit maxlength="30" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="handleReturn(form.id)" type="danger">{{ `关闭(退还)` }}</el-button>
                <!-- <el-button @click="handleUnreturn(form.id)" type="danger">{{ `关闭(不退还)` }}</el-button> -->
                <el-button @click="handleFinish(form.id)" type="success">{{ `完成订单` }}</el-button>
                <el-button @click="handleClose" type="primary">{{ $t("common.cancel") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CoinExchangeOrdersProxy from "@/views/coin_exchange_orders/proxy/CoinExchangeOrdersProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
//@ts-ignore
import Clipboard from "clipboard";
import { Message } from "element-ui";

@Component
export default class CoinExchangeOrdersDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CoinExchangeOrdersProxy = this.getProxy(CoinExchangeOrdersProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    // 复制ID
    onCopy(target: any) {
        const clipboard = new Clipboard(`#${target}`);
        clipboard.on("success", () => {
            Message.info("复制成功");
            clipboard.destroy(); // 释放内存
        });
        clipboard.on("error", () => {
            // 不支持复制
            Message.info("该浏览器不支持自动复制");
            clipboard.destroy(); // 释放内存
        });
    }

    private handleFinish(id: string) {
        this.myProxy.onFinishOrder(id);
    }
    private handleReturn(id: string) {
        this.myProxy.onReturn(id);
    }
    private handleUnreturn(id: string) {
        this.myProxy.onUnreturn(id);
    }
    private handleClose() {
        this.myProxy.hideDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.copy_group {
    ::v-deep .el-button {
        margin-left: 8px;
    }
}
</style>
