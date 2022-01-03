<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="1300px" @close="hide">
        <el-form v-loading="myProxy.dialogData.loading">
            <el-scrollbar style="height: 860px">
                <el-form ref="form" :rules="rules" :model="form" label-width="115px">
                    <el-form-item size="mini" :label="tableColumns.activity_name.name" prop="activity_name">
                        <el-input v-model="form.activity_name" :placeholder="$t('common.pleaseEnter')"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['activity_desc'].name" prop="activity_desc">
                        <el-input
                            type="textarea"
                            v-model="form.activity_desc"
                            :placeholder="$t('common.pleaseEnter')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                        <el-input v-model="form.icon" :placeholder="$t('common.pleaseEnter')"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['type'].name" prop="type">
                        <el-select
                            v-model="form.type"
                            filterable
                            :placeholder="$t('common.pleaseChoose')"
                            @change="onModelTypeChange"
                        >
                            <el-option
                                v-for="(value, key) in tableColumns['type'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        size="mini"
                        :label="tableColumns['category'].name"
                        prop="category"
                        v-if="filterCategory"
                    >
                        <el-select
                            v-model="form.category"
                            clearable
                            filterable
                            :placeholder="$t('common.pleaseChoose')"
                        >
                            <el-option
                                v-for="(value, key) in filterCategory"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['open_mode'].name" prop="open_mode">
                        <el-select v-model="form.open_mode" filterable :placeholder="$t('common.pleaseChoose')">
                            <el-option
                                v-for="(value, key) in tableColumns['open_mode'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_period'].name" prop="settlement_period">
                        <el-select v-model="form.settlement_period" filterable :placeholder="$t('common.pleaseChoose')">
                            <el-option
                                v-for="(value, key) in tableColumns['settlement_period'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_type'].name" prop="settlement_type">
                        <el-radio-group v-model="form.settlement_type">
                            <el-radio
                                v-for="(value, key) in tableColumns['settlement_type'].options"
                                :key="key"
                                :label="Number(key)"
                            >
                                {{ value }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        size="mini"
                        :label="tableColumns['award_types'].name"
                        prop="award_types"
                        v-if="isShowAwardType"
                    >
                        <el-checkbox-group v-model="form.award_types">
                            <el-checkbox
                                v-for="(value, key) in tableColumns['award_types'].options"
                                :key="key"
                                :label="Number(key)"
                            >
                                {{ value }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item
                        size="mini"
                        :label="tableColumns['award_tpl'].name"
                        prop="award_tpl"
                        v-if="isShowAwardTpl"
                    >
                        <el-input v-model="form.award_tpl" :placeholder="$t('common.pleaseEnter')"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['show_types'].name" prop="show_types">
                        <el-checkbox-group v-model="form.show_types">
                            <el-checkbox
                                v-for="(value, key) in tableColumns['show_types'].options"
                                :key="key"
                                :label="Number(key)"
                                @change="onShowTypeChange($event, key)"
                            >
                                {{ value }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['bonus_multiple'].name" prop="bonus_multiple">
                        <el-input
                            type="number"
                            v-model="form.bonus_multiple"
                            :placeholder="$t('common.pleaseEnter')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['is_once'].name" prop="is_once">
                        <el-radio-group v-model="form.is_once">
                            <el-radio
                                v-for="(value, key) in tableColumns['is_once'].options"
                                :key="key"
                                :label="Number(key)"
                            >
                                {{ value }}
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['rules'].name" prop="rules">
                        <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="onAddRule"
                            >{{ $t("common.addRule") }}
                        </el-button>
                    </el-form-item>

                    <PlatActivityRule v-if="myProxy.dialogData.isRender" />
                </el-form>
            </el-scrollbar>
            <div class="dialog-footer">
                <el-button
                    type="danger"
                    size="mini"
                    v-if="isStatusUpdate && checkUnique(unique.plat_activity_model_delete)"
                    @click="handleDelete(form)"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button
                    v-if="checkUnique(unique.plat_activity_model_update)"
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ $t("common.save") }}</el-button
                >
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatActivityModelProxy from "@/views/plat_activity_model/proxy/PlatActivityModelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import PlatActivityRule from "./components/PlatActivityRule.vue";
import Cookies from "js-cookie";

@Component({
    components: {
        PlatActivityRule,
    },
})
export default class PlatActivityModelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }
    private filterCategory = "";

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
            activity_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            activity_desc: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            icon: [{ required: false }],
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            open_mode: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            settlement_period: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            settlement_type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            award_types: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            show_types: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            bonus_multiple: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            link_url: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            award_tpl: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            category: [{ required: false, message: this.$t("common.requiredSelect"), trigger: "change" }],
            is_once: [{ required: false, message: this.$t("common.requiredInput"), trigger: "change" }],
            rules: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    get isShowAwardType() {
        return this.form.settlement_type == 2 || this.form.settlement_type == 1;
    }

    get isShowAwardTpl() {
        return (this.form.award_types.includes(1) || this.form.award_types.includes(4)) && this.isShowAwardType;
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
    onShowTypeSelect(value: any) {
        console.error(value);
    }
    // 模型類型變動
    private onModelTypeChange(type: string) {
        const category = JSON.parse(JSON.stringify(this.tableColumns["category"].options));
        let filterCategory: any = {};
        Object.keys(category).forEach((key: string) => {
            let typeId = key.substring(0, key.length - 2);
            if (type == typeId) {
                filterCategory[key] = category[key];
            }
        });
        if (Object.keys(filterCategory).length === 0) {
            filterCategory = "";
        }
        this.form.category = "";
        this.filterCategory = filterCategory;
    }

    // 展示方式變動
    onShowTypeChange(event: any, key: number) {
        // 點選客戶端處理
        if (key == 0 && event == true) {
            this.form.show_types = [0];
        } else if (key > 0 && event == true) {
            Object.keys(this.form.show_types).forEach(element => {
                if (this.form.show_types[element] == 0) {
                    delete this.form.show_types[element];
                }
            });
        }
    }
    // 新增规则
    private onAddRule() {
        this.myProxy.addRule();
    }

    private hide() {
        this.myProxy.dialogData.isRender = false;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.dialog-footer {
    margin-top: 16px;
}
::v-deep .el-scrollbar__wrap {
    overflow-x: auto;
}
</style>
