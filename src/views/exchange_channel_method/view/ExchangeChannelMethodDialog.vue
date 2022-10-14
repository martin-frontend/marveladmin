<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <div class="header">
            <!-- 所属平台 -->
            <div>
                <span class="title">{{ tableColumns.plat_id.name }}</span>
                <span>{{ tableColumns.plat_id.options[row.plat_id] }} </span>
            </div>
            <!-- 兑换厂商 -->
            <div>
                <span class="title">{{ tableColumns.vendor_name.name }}</span>
                <span>{{ row.vendor_name }}</span>
            </div>
            <!-- 兑换渠道 -->
            <div>
                <span class="title">{{ tableColumns.name.name }}</span>
                <span>{{ row.name }}</span>
            </div>
        </div>

        <el-form ref="form" :rules="rules" :model="form" label-width="150px" v-loading="net_status.loading">
            <!-- 币种 -->
            <el-form-item size="mini" :label="methodTableColumns['coin_name_unique'].name" prop="coin_name_unique">
                <el-select
                    v-model="form.coin_name_unique"
                    class="select"
                    placeholder="请选择"
                    @change="getBlockNetworkOptions"
                >
                    <el-option
                        v-for="(value, key) in methodTableColumns['coin_network_map'].options[row.plat_id]"
                        :key="key"
                        :label="value.name"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 链 -->
            <el-form-item size="mini" :label="methodTableColumns['block_network_id'].name" prop="block_network_id">
                <el-select v-model="form.block_network_id" class="select" placeholder="请选择">
                    <el-option
                        v-for="(value, key) in blockNetworkOptions"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['min_gold'].name" prop="min_gold">
                <el-input v-model="form.min_gold" type="number" min="0"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['max_gold'].name" prop="max_gold">
                <el-input v-model="form.max_gold" type="number" min="0"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['free_time'].name" prop="free_time">
                <el-input v-model="form.free_time" type="number" min="0"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['balance'].name" prop="balance">
                <el-input v-model="form.balance" type="number" min="0"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['fee'].name" prop="fee">
                <el-input v-model="form.fee" type="number" min="0"><i slot="suffix">%</i></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['min_fee'].name" prop="min_fee">
                <el-input v-model="form.min_fee" type="number" min="0"><i slot="suffix">%</i></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns['explain'].name" prop="explain">
                <div class="flex d-flex">
                <el-input type="textarea" v-model="form.explain" style="margin-right: 0.8rem"></el-input>
                <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.explain)"
                        >翻译</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item size="mini" :label="methodTableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in methodTableColumns.status.options" :key="key" :label="key">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" v-if="isStatusUpdate" @click="handleDelete()">{{
                $t("common.delete")
            }}</el-button>
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
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class ExchangeChannelMethodDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);

    // columns
    private tableColumns = this.myProxy.tableData.columns;
    private methodTableColumns: any = this.myProxy.methodTableData.columns;

    // table Data
    private tableData = this.myProxy.dialogDataChannelData.row.payment_method_detail;
    private row = this.myProxy.dialogDataChannelData.row;
    private form = this.myProxy.dialogData.form;
    //网络状态
    private net_status = GlobalVar.net_status;

    //练 下拉选单
    private blockNetworkOptions = [];

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

    mounted() {
        if (this.isStatusUpdate) {
            this.getBlockNetworkOptions();
        }
    }

    get status() {
        console.warn("status", this.myProxy.dialogData.status);
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            payment_method_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            coin_name_unique: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            block_network_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            exchange_channel_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            min_gold: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            max_gold: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            free_time: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            fee: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            min_fee: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            balance: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    /**二级联动 链 */
    getBlockNetworkOptions() {
        this.blockNetworkOptions = this.methodTableColumns.coin_network_map.options[this.row.plat_id][
            this.form.coin_name_unique
        ].options;
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
        this.myProxy.onDelete();
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_RECHARGE_EXCHANGE;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.header {
    margin-bottom: 26px;
    > div {
        margin-bottom: 6px;
    }
    span {
        margin-right: 16px;
    }
    .title {
        width: 100px;
        display: inline-block;
    }
}
</style>
