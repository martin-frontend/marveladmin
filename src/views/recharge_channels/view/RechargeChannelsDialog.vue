<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="600px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id">
                <el-select v-model="form.plat_id" filterable class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in myProxy.dialogData.platOptions"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="`${tableColumns.vendor_id.name}`" prop="vendor_id">
                <el-select v-model="form.vendor_id" filterable class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.vendor_id.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="`${tableColumns.name.name}`" prop="name">
                <el-input
                    clearable
                    maxlength="30"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.name"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item v-if="form.support_paymethods != 1" :label="`${tableColumns.account.name}`" prop="account">
                <el-input
                    clearable
                    maxlength="50"
                    :placeholder="$t('common.pleaseEnter')"
                    v-model="form.account"
                ></el-input>
            </el-form-item> -->
            <el-form-item :label="`${tableColumns.secret.name}`" prop="secret">
                <el-input clearable :placeholder="$t('common.pleaseEnter')" v-model="form.secret"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns.support_paymethods.name" prop="support_paymethods">
                <template v-if="!form.vendor_id">
                    <span class="redFont">{{ $t("recharge_channels.rechargeVendorSelect") }} </span>
                </template>
                <template v-else>
                    <el-checkbox-group v-model="form.support_paymethods">
                        <el-checkbox
                            v-for="(value, key) in tableColumns.vendor_id.options_key[form.vendor_id]"
                            :key="key"
                            :label="Number(key)"
                            >{{ value }}</el-checkbox
                        >
                    </el-checkbox-group>
                </template>
            </el-form-item>

            <el-form-item v-if="form.support_paymethods == 1" :label="`${tableColumns.coin_name_unique.name}`" prop="coin_name_unique">
                <el-select v-model="form.coin_name_unique" filterable class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.coin_relations[form.plat_id]"
                        :key="key"
                        :label="value.name"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.support_paymethods == 1 && form.coin_name_unique" :label="`${tableColumns.block_network_id.name}`" prop="block_network_id">
                <el-select v-model="form.block_network_id" filterable class="select" :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.coin_relations[form.plat_id][form.coin_name_unique].block_network_id"
                        :key="key"
                        :label="value.name"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.support_paymethods == 1 && form.coin_name_unique && form.block_network_id" :label="`${tableColumns.account.name}`" prop="account">
                <el-select v-model="form.account" filterable class="select" :placeholder="$t('common.pleaseChoose')" width="100%">
                    <el-option
                        v-for="(value, key) in tableColumns.coin_relations[form.plat_id][form.coin_name_unique].block_network_id[form.block_network_id].account"
                        :key="key"
                        :label="value"
                        :value="value"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="`${tableColumns.extend_params.name}`" prop="extend_params">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.extend_params" />
                </div>
            </el-form-item>
            <el-form-item :label="`${tableColumns.status.name}`" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.recharge_channels_update)"
                    type="danger"
                    size="mini"
                    @click="handleDelete()"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button
                    v-if="checkUnique(unique.recharge_channels_update)"
                    type="primary"
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
import RechargeChannelsProxy from "@/views/recharge_channels/proxy/RechargeChannelsProxy";
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
export default class RechargeChannelsDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: RechargeChannelsProxy = this.getProxy(RechargeChannelsProxy);
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
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            vendor_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            account: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            secret: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            support_paymethods: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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

.redFont {
    color: red;
}
</style>
