<template>
    <el-dialog
        :title="`${textMap[status]}` + $t('plat_vendors_wallet.vender')"
        :visible.sync="myProxy.dialogData.bShow"
    >
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-position="left"
            label-width="140px"
            style="width: 100%; padding-left: 50px; padding-right: 50px"
            v-loading="net_status.loading"
        >
            <el-form-item size="mini" :label="tableColumns['vendor_name'].name" prop="vendor_name">
                <el-input v-model="form.vendor_name" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_desc'].name" prop="vendor_desc">
                <el-input type="textarea" v-model="form.vendor_desc" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_name_unique'].name" prop="vendor_name_unique">
                <el-input v-model="form.vendor_name_unique" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_types'].name" prop="vendor_types">
                <el-checkbox-group v-model="form.vendor_types">
                    <el-checkbox
                        v-for="(value, key) in tableColumns.vendor_types.options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['is_save_bet_info'].name" prop="is_save_bet_info">
                <el-switch v-model="form.is_save_bet_info" :active-value="1" :inactive-value="98"></el-switch>
            </el-form-item>
            <!-- 结算方式 -->
            <el-form-item size="mini" :label="tableColumns['currency_type'].name" prop="currency_type">
                <el-radio-group v-model="form.currency_type">
                    <el-radio v-for="(value, key) in tableColumns.currency_type.options" :key="key" :label="key">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 系统参数id -->
            <el-form-item :label="tableColumns.proxy_key.name" prop="proxy_key">
                <el-select
                    v-model="form.proxy_key"
                    filterable
                    class="select"
                    :placeholder="$t('common.requiredSelect')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.proxy_key.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 统计与东8区差值 -->
            <el-form-item
                size="mini"
                :label="tableColumns['time_region_hour_interval'].name"
                prop="time_region_hour_interval"
            >
                <el-input
                    oninput="value=value.replace(/[^\d-]/g,'');
                            if(value.indexOf('-')===0){
                                value = value.replace(/-/g,'');
                                value = '-' + value;
                            }
                            else{
                                value = value.replace(/-/g,'');
                            }
                            if(value > 24) value = 24;
                            if(value < -24) value = -24"
                    v-model="form.time_region_hour_interval"
                    :placeholder="$t('common.pleaseEnter')"
                ></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['extends'].name" prop="extends">
                <!-- <el-input type="textarea" v-model="form.extends" placeholder="接入厂商所需配置"></el-input> -->
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="myProxy.dialogData.extendsData" />
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate && checkUnique(unique.vendor_delete)" type="danger" size="mini" @click="handleDelete">{{
                    $t("common.delete")
                }}</el-button>
                <el-button v-if="checkUnique(unique.vendor_update)" type="primary" size="mini" @click="!isStatusUpdate ? handleAdd() : handleUpdate()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import VendorProxy from "@/views/vendor/proxy/VendorProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import JsonEditor from "@/components/JsonEditor/index.vue";
import { jsonStringify, jsonToObject } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        JsonEditor,
    },
})
export default class VendorDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VendorProxy = this.getProxy(VendorProxy);
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
            vendor_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            vendor_name_unique: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            vendor_types: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            extends: [{ required: false, message: this.$t("common.requiredInput"), trigger: "change" }],
            currency_type: [{ required: true }],
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
        this.myProxy.onDelete(this.form.vendor_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
