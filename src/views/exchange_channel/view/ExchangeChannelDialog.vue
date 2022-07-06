<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select
                    v-model="form.plat_id"
                    filterable
                    clearable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.exchange_vendors_id.name" prop="exchange_vendors_id">
                <el-select
                    v-model="form.exchange_vendors_id"
                    filterable
                    clearable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.exchange_vendors_id.options"
                        :key="key"
                        :label="value.name"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                v-if="
                    form.exchange_vendors_id &&
                        tableColumns.exchange_vendors_id.options[form.exchange_vendors_id].payment_method_type == 3
                "
                :label="`${tableColumns.coin_name_unique.name}`"
                prop="coin_name_unique"
            >
                <el-select
                    v-model="form.coin_name_unique"
                    filterable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.coin_relations[form.plat_id]"
                        :key="key"
                        :label="value.name"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="
                    form.exchange_vendors_id &&
                        tableColumns.exchange_vendors_id.options[form.exchange_vendors_id].payment_method_type == 3 &&
                        form.coin_name_unique
                "
                :label="`${tableColumns.block_network_id.name}`"
                prop="block_network_id"
            >
                <el-select
                    v-model="form.block_network_id"
                    filterable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.coin_relations[form.plat_id][form.coin_name_unique]
                            .block_network_id"
                        :key="key"
                        :label="value.name"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="
                    form.exchange_vendors_id &&
                        tableColumns.exchange_vendors_id.options[form.exchange_vendors_id].payment_method_type == 3 &&
                        form.coin_name_unique &&
                        form.block_network_id
                "
                :label="`${tableColumns.account.name}`"
                prop="account"
            >
                <el-select
                    v-model="form.account"
                    filterable
                    class="select"
                    :placeholder="$t('common.pleaseChoose')"
                    width="100%"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.coin_relations[form.plat_id][form.coin_name_unique]
                            .block_network_id[form.block_network_id].account"
                        :key="key"
                        :label="value"
                        :value="value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.name.name" prop="name">
                <el-input v-model="form.name" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.account.name" prop="account">
                <el-input v-model="form.account" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.secret.name" prop="secret">
                <el-input v-model="form.secret" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>

            <el-form-item :label="tableColumns.extend_params.name">
                <div class="editor-container">
                    <JsonEditor v-model="form.extend_params" />
                </div>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.status.name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.exchange_channel_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button
                    type="primary"
                    v-if="checkUnique(unique.exchange_channel_update)"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ $t("common.save") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import ExchangeChannelProxy from "@/views/exchange_channel/proxy/ExchangeChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import JsonEditor from "@/components/JsonEditor/index.vue";

@Component({
    components: {
        JsonEditor,
    },
})
export default class ExchangeChannelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: ExchangeChannelProxy = this.getProxy(ExchangeChannelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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
            plat_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            exchange_vendors_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            account: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            secret: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            status: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            coin_name_unique: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            block_network_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
