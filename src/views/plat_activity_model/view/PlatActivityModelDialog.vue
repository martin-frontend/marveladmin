<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="1300px" @close="hide">
        <el-form v-loading="myProxy.dialogData.loading">
            <el-scrollbar style="height: 860px">
                <el-form ref="form" :rules="rules" :model="form" label-width="115px">
                    <el-form-item size="mini" :label="tableColumns.activity_name.name" prop="activity_name">
                        <el-input v-model="form.activity_name" :placeholder="LangUtil('请输入')"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['activity_desc'].name" prop="activity_desc">
                        <el-input
                            type="textarea"
                            v-model="form.activity_desc"
                            :placeholder="LangUtil('请输入')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                        <el-input v-model="form.icon" :placeholder="LangUtil('请输入')"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['active_model_tag'].name" prop="active_model_tag">
                        <el-input v-model="form.active_model_tag" :placeholder="LangUtil('请输入')"></el-input>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['type'].name" prop="type">
                        <el-select
                            v-model="form.type"
                            filterable
                            :placeholder="LangUtil('请选择')"
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
                        <el-select v-model="form.category" clearable filterable :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(value, key) in filterCategory"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['open_mode'].name" prop="open_mode">
                        <el-select v-model="form.open_mode" filterable :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(value, key) in tableColumns['open_mode'].options"
                                :key="key"
                                :label="value"
                                :value="Number(key)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item size="mini" :label="tableColumns['settlement_period'].name" prop="settlement_period">
                        <el-select v-model="form.settlement_period" filterable :placeholder="LangUtil('请选择')">
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
                        <el-input v-model="form.award_tpl" :placeholder="LangUtil('请输入')"></el-input>
                    </el-form-item>
                    <el-form-item
                        v-if="form.active_model_tag == '16'"
                        size="mini"
                        :label="LangUtil('派奖方式')"
                    >
                        <div>
                            <el-row>
                                {{ tableColumns["daily_ratio"].name }}
                            </el-row>
                            <el-row :gutter="10">
                                <el-col :span="3">
                                    <div>
                                        <el-button
                                            @click="onDeleteDailyRatio()"
                                            :disabled="!form.daily_ratio || form.daily_ratio.length < 1"
                                            type="primary"
                                            icon="el-icon-refresh"
                                            >{{ LangUtil("删除") }}</el-button
                                        >
                                    </div>
                                    <div style="margin-top: 8px;">
                                        <el-button @click="onAddDailyRatio()" type="primary" icon="el-icon-refresh">{{
                                            LangUtil("添加")
                                        }}</el-button>
                                    </div>
                                </el-col>

                                <el-col :span="3" v-for="(value, key) in form.daily_ratio" :key="key">
                                    <div style="height: 30px;">{{ LangUtil("第{0}天%", key + 1) }}</div>
                                    <div style="margin-top: 8px; height:30px">
                                        <el-input-number
                                            v-model="form.daily_ratio[key]"
                                            size="mini"
                                            :precision="1"
                                            :step="1"
                                            :max="100"
                                            controls-position="right"
                                            style="width: 100%"
                                        ></el-input-number>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
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
                            :placeholder="LangUtil('请输入')"
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
                            >{{ LangUtil("新增规则") }}
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
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    v-if="checkUnique(unique.plat_activity_model_update)"
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </div>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityModelProxy = this.getProxy(PlatActivityModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    get form() {
        return this.myProxy.dialogData.form;
    }
    filterCategory = "";

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
            activity_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            activity_desc: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            icon: [{ required: false }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            open_mode: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            settlement_period: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            settlement_type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            award_types: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            show_types: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            bonus_multiple: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            link_url: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            award_tpl: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            category: [{ required: false, message: this.LangUtil("必须选择"), trigger: "change" }],
            is_once: [{ required: false, message: this.LangUtil("必须填写"), trigger: "change" }],
            rules: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
        };
    }

    get isShowAwardType() {
        return this.form.settlement_type == 2 || this.form.settlement_type == 1;
    }

    get isShowAwardTpl() {
        return (this.form.award_types.includes(1) || this.form.award_types.includes(4)) && this.isShowAwardType;
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
        this.myProxy.onDelete(this.form.id);
    }
    onShowTypeSelect(value: any) {
        console.error(value);
    }
    // 模型類型變動
    onModelTypeChange(type: string) {
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
    onAddRule() {
        this.myProxy.addRule();
    }

    hide() {
        this.myProxy.dialogData.isRender = false;
    }
    /** 添加每日返水  */
    onAddDailyRatio() {
        console.log("点击添加");
        this.form.daily_ratio.push(0);
    }
    onDeleteDailyRatio() {
        console.log("点击删除");
        this.form.daily_ratio.pop();
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
