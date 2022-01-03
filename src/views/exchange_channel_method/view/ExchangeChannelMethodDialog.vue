<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="150px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="columnInfo.plat_id.name" prop="plat_id">
                {{ columnInfo.plat_id.options[form.plat_id] }}
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.exchange_channel_id.name" prop="exchange_channel_id"
                >{{ form.exchange_channel_id }}
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.payment_method_type.name" prop="payment_method_type">
                {{ columnInfo.payment_method_type.options[form.payment_method_type] }}
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.min_gold.name" prop="min_gold">
                <el-input v-model="form.min_gold" :placeholder="columnInfo.min_gold.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.max_gold.name" prop="max_gold">
                <el-input v-model="form.max_gold" :placeholder="columnInfo.max_gold.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.free_time.name" prop="free_time">
                <el-input v-model="form.free_time" :placeholder="columnInfo.free_time.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.fee.name" prop="fee">
                <el-input v-model="form.fee" :placeholder="columnInfo.fee.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.min_fee.name" prop="min_fee">
                <el-input v-model="form.min_fee" :placeholder="columnInfo.min_fee.name">\ </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.balance.name" prop="balance">
                <el-input v-model="form.balance" :placeholder="columnInfo.balance.name"> </el-input>
            </el-form-item>
            <el-form-item size="mini" :label="columnInfo.subtitle.name" prop="subtitle">
                <el-input
                    v-model="form.subtitle"
                    :placeholder="$t('common.pleaseEnter')"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                ></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="columnInfo.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in columnInfo.status.options" :key="key" :label="key">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button
                v-if="checkUnique(unique.exchange_channel_method_update)"
                type="primary"
                size="mini"
                @click="!isStatusUpdate ? handleAdd() : handleUpdate()"
                >{{ $t("common.save") }}</el-button
            >
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import ExchangeChannelMethodProxy from "@/views/exchange_channel_method/proxy/ExchangeChannelMethodProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { checkUnique, unique } from "@/core/global/Permission";

@Component
export default class ExchangeChannelMethodDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    // proxy property
    private columnInfo = this.myProxy.tableData.methodColumns;
    private form = this.myProxy.dialogData.form;
    //网络状态
    private net_status = GlobalVar.net_status;

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
            min_gold: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            max_gold: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            free_time: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            fee: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            min_fee: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            balance: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
        this.myProxy.onDelete("");
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
