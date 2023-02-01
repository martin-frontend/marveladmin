<template>
    <el-dialog :title="`${textMap[status]}` + LangUtil('厂商')" :visible.sync="myProxy.dialogData.bShow">
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
                <el-input v-model="form.vendor_name" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_desc'].name" prop="vendor_desc">
                <el-input type="textarea" v-model="form.vendor_desc" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_name_unique'].name" prop="vendor_name_unique">
                <el-input v-model="form.vendor_name_unique" :placeholder="LangUtil('请输入')"></el-input>
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
            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages">
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox v-for="(value, key) in tableColumns.languages.options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['is_save_bet_info'].name" prop="is_save_bet_info">
                <el-switch v-model="form.is_save_bet_info" :active-value="1" :inactive-value="98"></el-switch>
            </el-form-item>
            <!-- 结算币种 -->
            <el-form-item size="mini" :label="tableColumns['settle_coin_name_unique'].name" prop="settle_coin_name_unique">
                <el-select v-model="form.settle_coin_name_unique" clearable filterable class="select" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.settle_coin_name_unique.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 系统参数id -->
            <el-form-item :label="tableColumns.proxy_key.name" prop="proxy_key">
                <el-select v-model="form.proxy_key" filterable class="select" :placeholder="LangUtil('必须选择')">
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
                    :placeholder="LangUtil('请输入')"
                ></el-input>
            </el-form-item>
            <!-- 获取用户余额地址 -->
            <el-form-item size="mini" :label="tableColumns['url_get_balance'].name" prop="url_get_balance">
                <el-input v-model="form.url_get_balance" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <!-- 更新用户余额地址 -->
            <el-form-item size="mini" :label="tableColumns['url_update_balance'].name" prop="url_update_balance">
                <el-input v-model="form.url_update_balance" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <!-- 钱包类型 -->
            <el-form-item :label="tableColumns.vendor_wallet_type.name" prop="vendor_wallet_type">
                <el-select
                    v-model="form.vendor_wallet_type"
                    filterable
                    class="select"
                    :placeholder="LangUtil('必须选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.vendor_wallet_type.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['extends'].name" prop="extends">
                <!-- <el-input type="textarea" v-model="form.extends" placeholder="接入厂商所需配置"></el-input> -->
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="myProxy.dialogData.extendsData" />
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['bet_code_content'].name" prop="bet_code_content">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="myProxy.dialogData.betCodeContentData" />
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['bet_result_content'].name" prop="bet_result_content">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="myProxy.dialogData.betResultContentData" />
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
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.vendor_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    v-if="checkUnique(unique.vendor_update)"
                    type="primary"
                    size="mini"
                    @click="!isStatusUpdate ? handleAdd() : handleUpdate()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VendorProxy = this.getProxy(VendorProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
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
            vendor_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            vendor_name_unique: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            vendor_types: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            extends: [{ required: false, message: this.LangUtil("必须填写"), trigger: "change" }],
            currency_type: [{ required: true }],
            languages: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.vendor_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
