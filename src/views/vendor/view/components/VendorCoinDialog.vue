<template>
    <el-dialog :title="`${textMap[status]}` + LangUtil('支持币种')" :visible.sync="myProxy.dialogCoinData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="130px" v-loading="net_status.loading">
            <!-- 支持币种 -->
            <el-form-item size="mini" :label="tableColumns['coin_name_unique'].name" prop="coin_name_unique">
                <el-select
                    v-model="form.coin_name_unique"
                    clearable
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                    :disabled="isStatusUpdate"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.coin_name_unique.options"
                        :key="key"
                        :label="key"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 厂商币种编号 -->
            <el-form-item
                size="mini"
                :label="tableColumns['vendor_coin_name_unique'].name"
                prop="vendor_coin_name_unique"
            >
                <el-input v-model="form.vendor_coin_name_unique" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete">
                    {{ LangUtil("删除") }}
                </el-button>
                <el-button type="primary" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import VendorProxy from "@/views/vendor/proxy/VendorProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { DialogStatus } from "@/core/global/Constant";
import { MessageBox } from "element-ui";

@Component
export default class VendorCoinDialog extends AbstractView {
    LangUtil = LangUtil;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VendorProxy = this.getProxy(VendorProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;

    get form() {
        return this.myProxy.dialogCoinData.form;
    }

    textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
    };

    get status() {
        return this.myProxy.dialogCoinData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            coin_name_unique: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            vendor_coin_name_unique: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    @Watch("myProxy.dialogCoinData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let selectedCoin = this.myProxy.tableData.columns.coin_name_unique.options[this.form.coin_name_unique];
                if (
                    this.myProxy.coinList.list.find(
                        (item: any) => item.coin_name_unique == selectedCoin.coin_name_unique
                    )
                ) {
                    let confirmText1: any = this.LangUtil("相同币种不能重复添加");
                    MessageBox.alert(confirmText1);
                } else {
                    selectedCoin.vendor_coin_name_unique = this.form.vendor_coin_name_unique;
                    this.myProxy.coinList.list.push(selectedCoin);
                    this.myProxy.hideCoinDialog();
                }
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                let selectedCoin = this.myProxy.tableData.columns.coin_name_unique.options[this.form.coin_name_unique];
                selectedCoin.vendor_coin_name_unique = this.form.vendor_coin_name_unique;
                this.myProxy.coinList.list.splice(
                    this.myProxy.coinList.list.findIndex(
                        ({ coin_name_unique }) => coin_name_unique == this.form.coin_name_unique
                    ),
                    1,
                    selectedCoin
                );
                this.myProxy.hideCoinDialog();
            }
        });
    }
    handleDelete() {
        let confirmText1: any = this.LangUtil("是否删除该币种");
        let prompt: any = this.LangUtil("提示");
        let determine: any = this.LangUtil("确定");
        let cancel: any = this.LangUtil("取消");
        MessageBox.confirm(confirmText1, prompt, {
            confirmButtonText: determine,
            cancelButtonText: cancel,
            type: "warning",
        })
            .then(() => {
                this.myProxy.coinList.list.splice(
                    this.myProxy.coinList.list.findIndex(
                        ({ coin_name_unique }) => coin_name_unique == this.form.coin_name_unique
                    ),
                    1
                );
                this.myProxy.hideCoinDialog();
            })
            .catch(() => {});
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
